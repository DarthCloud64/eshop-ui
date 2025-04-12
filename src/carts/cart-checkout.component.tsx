declare const window: any;

import { SetStateAction, useEffect, useState } from "react";
import Cart from "../models/cart";
import { useAuth0 } from "@auth0/auth0-react";
import Product from "../models/product";
import axios from "axios";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const productServiceUrl = import.meta.env.VITE_PRODUCT_SERVICE ?? window._env_.VITE_PRODUCT_SERVICE;
const orderServiceUrl = import.meta.env.VITE_ORDER_SERVICE ?? window._env_.VITE_ORDER_SERVICE;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? window._env_.VITE_AUTH0_AUDIENCE;

interface CartProps{
    cart: Cart,
    setCart: React.Dispatch<SetStateAction<Cart>>
}

const CartCheckout: React.FC<CartProps> = ({cart, setCart}) => {
    const {getAccessTokenSilently} = useAuth0();
    const [products, setProducts] = useState<Map<Number, Product>>(new Map<Number, Product>());

    useEffect(() => {
        const fetchProduct = async (productId: String) => {
            try{
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: audience
                    }
                })

                return await axios.get(`${productServiceUrl}/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
            }
            catch{
            }
        }

        Array.from(cart?.products?.entries()).map(([key, val]) => {
            fetchProduct(key).then(product => {
                let map = new Map<Number, Product>();
                map.set(val, product?.data.products[0]);
                setProducts(map);
            });
        })
    }, [cart]);

    const removeProductFromCart = (productId: String) => {
        const action = async () => {
            const accessToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: audience
                }
            });

            let removeProductFromCartRequest = {
                cart_id: cart.id,
                product_id: productId,
            };

            await axios.put(`${orderServiceUrl}/carts/removeProductFromCart`, removeProductFromCartRequest, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            let getCartResponse = await axios.get(`${orderServiceUrl}/carts/${cart.id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            let newCartInstance = getCartResponse.data.carts[0];
            localStorage.setItem("user-cart", JSON.stringify(newCartInstance));

            if (newCartInstance && newCartInstance.products && !(newCartInstance.products instanceof Map)) {
                newCartInstance.products = new Map(Object.entries(newCartInstance.products));
            }

            return newCartInstance;
        }

        action().then(newCartInstance => {
            setCart(newCartInstance);
        });
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(products?.entries()).map(([key, val]) => (
                            <TableRow key={val.id.toString()}>
                                <TableCell>{val.name}</TableCell>
                                <TableCell><Button onClick={() => removeProductFromCart(val.id)}><RemoveIcon/></Button>{key.toString()}<Button><AddIcon/></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CartCheckout;
declare const window: any;

import axios from "axios";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Product from "../models/product";
import { Button } from "@mui/material";
import Cart from "../models/cart";
import { useAuth0 } from "@auth0/auth0-react";

const productServiceUrl = import.meta.env.VITE_PRODUCT_SERVICE ?? window._env_.VITE_PRODUCT_SERVICE;
const orderServiceUrl = import.meta.env.VITE_ORDER_SERVICE ?? window._env_.VITE_ORDER_SERVICE;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? window._env_.VITE_AUTH0_AUDIENCE;

interface ProductDetailsProps{
    cart: Cart
    setCart: React.Dispatch<SetStateAction<Cart>>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({cart, setCart}) => {
    let {productId} = useParams();
    const initialized = useRef(false);
    const {getAccessTokenSilently} = useAuth0();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: audience
                    }
                })

                let product = await axios.get(`${productServiceUrl}/products/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                setProduct(product.data.products[0]);
            }
            catch{
                
            }
        }

        if (!initialized.current){
            initialized.current = true;
            fetchProduct();
        }
    },[]);

    return (
        <>
            <h1>{product?.name}</h1>
            <h2>{product?.description}</h2>
            <Button size="small" onClick={async () => {
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: audience
                    }
                });

                if (cart.id === ""){
                    let createCartResponse = await axios.post(`${orderServiceUrl}/carts`, {}, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    let createdCartId = createCartResponse.data.id;

                    let addProductToCartRequest = {
                        cart_id: createdCartId,
                        product_id: product?.id
                    };

                    let addProductToCartResponse = await axios.put(`${orderServiceUrl}/carts/addProductToCart`, addProductToCartRequest, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    let getCartResponse = await axios.get(`${orderServiceUrl}/carts/${addProductToCartResponse.data.cart_id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    setCart(getCartResponse.data.carts[0]);
                    localStorage.setItem("user-cart", JSON.stringify(getCartResponse.data.carts[0]));
                }
                else {
                    let addProductToCartRequest = {
                        cart_id: cart.id,
                        product_id: product?.id
                    };

                    let addProductToCartResponse = await axios.put(`${orderServiceUrl}/carts/addProductToCart`, addProductToCartRequest, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    })

                    let getCartResponse = await axios.get(`${orderServiceUrl}/carts/${addProductToCartResponse.data.cart_id}`, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`
                        }
                    });

                    setCart(getCartResponse.data.carts[0]);
                    localStorage.setItem("user-cart", JSON.stringify(getCartResponse.data.carts[0]));
                }
            }}>Add to Cart</Button>
        </>
    )
}

export default ProductDetails;
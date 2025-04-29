declare const window: any;

import axios from "axios";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { productAdded } from "./productDetailsSlice";
import { cartChanged } from "../cart/cartSlice";

const productServiceUrl = import.meta.env.VITE_PRODUCT_SERVICE ?? window._env_.VITE_PRODUCT_SERVICE;
const orderServiceUrl = import.meta.env.VITE_ORDER_SERVICE ?? window._env_.VITE_ORDER_SERVICE;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? window._env_.VITE_AUTH0_AUDIENCE;

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    let {productId} = useParams();
    const initialized = useRef(false);
    const {getAccessTokenSilently} = useAuth0();
    const product = useAppSelector(state => state.productDetails)
    const cart = useAppSelector(state => state.cart)

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

                dispatch(productAdded(product.data.products[0]))
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

                if (cart.cart.id === ""){
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

                    let newCartInstance = getCartResponse.data.carts[0];
                    localStorage.setItem("user-cart", JSON.stringify(newCartInstance));

                    if(newCartInstance && newCartInstance.products  && !(newCartInstance.products instanceof Map)) {
                        newCartInstance.products = new Map(Object.entries(newCartInstance.products));
                    }

                    dispatch(cartChanged(newCartInstance));
                }
                else {
                    let addProductToCartRequest = {
                        cart_id: cart.cart.id,
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

                    let newCartInstance = getCartResponse.data.carts[0];
                    localStorage.setItem("user-cart", JSON.stringify(newCartInstance));

                    if(newCartInstance && newCartInstance.products  && !(newCartInstance.products instanceof Map)) {
                        newCartInstance.products = new Map(Object.entries(newCartInstance.products));
                    }

                    dispatch(cartChanged(newCartInstance));
                }
            }}>Add to Cart</Button>
        </>
    )
}

export default ProductDetails;
declare const window: any;

import axios from "axios";
import { useParams } from "react-router";
import { Button, CircularProgress } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { cartChanged } from "../cart/cartSlice";
import { useGetProductByIdQuery } from "../api/productApiSlice";

const orderServiceUrl = import.meta.env.VITE_ORDER_SERVICE ?? window._env_.VITE_ORDER_SERVICE;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? window._env_.VITE_AUTH0_AUDIENCE;

const ProductDetails = () => {
    const dispatch = useAppDispatch();
    let {productId} = useParams();
    const {getAccessTokenSilently} = useAuth0();
    const cart = useAppSelector(state => state.cart)

    const {data: products, isLoading, isSuccess, isError, error} = useGetProductByIdQuery(productId ?? "");

    let content: React.ReactNode;

    if (isLoading) {
        content = <CircularProgress />
    }
    else if (isSuccess) {
        content =  <><h1>{products.products[0].name}</h1>
            <h2>{products.products[0].description}</h2>
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
                        product_id: products.products[0].id
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
                        product_id: products.products[0].id
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
            }}>Add to Cart</Button></>
    }
    else if (isError){
        console.error(error);
        content = <div>{error.toString()}</div>
    }

    return (
        <>
            {content}
        </>
    )
}

export default ProductDetails;
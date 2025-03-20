declare const window: any;

import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../models/product";
import { Button } from "@mui/material";
import Cart from "../models/cart";

const productServiceUrl = import.meta.env.VITE_PRODUCT_SERVICE ?? window._env_.VITE_PRODUCT_SERVICE;
const orderServiceUrl = import.meta.env.VITE_ORDER_SERVICE ?? window._env_.VITE_ORDER_SERVICE;

interface ProductDetailsProps{
    cart: Cart
    setCart: React.Dispatch<SetStateAction<Cart>>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({cart, setCart}) => {
    let {productId} = useParams();
    const [product, setProduct] = useState<Product>();

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                let product = await axios.get(`${productServiceUrl}/products/${productId}`);
                setProduct(product.data.products[0]);
            }
            catch{
                
            }
        }

        fetchProduct();
    },[]);

    return (
        <>
            <h1>{product?.name}</h1>
            <h2>{product?.description}</h2>
            <Button size="small" onClick={async () => {
                if (cart.id === ""){
                    let createCartResponse = await axios.post(`${orderServiceUrl}/carts`, {});
                    let createdCartId = createCartResponse.data.id;

                    let addProductToCartRequest = {
                        cart_id: createdCartId,
                        product_id: product?.id
                    };
                    let addProductToCartResponse = await axios.put(`${orderServiceUrl}/carts/addProductToCart`, addProductToCartRequest)

                    let getCartResponse = await axios.get(`${orderServiceUrl}/carts/${addProductToCartResponse.data.cart_id}`);
                    setCart(getCartResponse.data.carts[0]);
                    localStorage.setItem("user-cart", JSON.stringify(getCartResponse.data.carts[0]));
                }
                else {
                    let addProductToCartRequest = {
                        cart_id: cart.id,
                        product_id: product?.id
                    };
                    let addProductToCartResponse = await axios.put(`${orderServiceUrl}/carts/addProductToCart`, addProductToCartRequest)

                    let getCartResponse = await axios.get(`${orderServiceUrl}/carts/${addProductToCartResponse.data.cart_id}`);
                    setCart(getCartResponse.data.carts[0]);
                    localStorage.setItem("user-cart", JSON.stringify(getCartResponse.data.carts[0]));
                }
            }}>Add to Cart</Button>
        </>
    )
}

export default ProductDetails;
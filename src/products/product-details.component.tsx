import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../models/product";
import { Button } from "@mui/material";
import { CartContext, CartContextModel } from "../carts/cart.context";

const ProductDetails = () => {
    let {productId} = useParams();
    const [product, setProduct] = useState<Product>();
    const [showErrorBanner, setShowErrorBanner] = useState(false);
    const {cart, setCart} = useContext<CartContextModel | undefined>(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try{
                let product = await axios.get(`http://localhost:9090/products/${productId}`);
                setProduct(product.data.products[0]);
            }
            catch{
                setShowErrorBanner(true);
            }
        }

        fetchProduct();
    },[]);

    return (
        <>
            <h1>{product?.name}</h1>
            <h2>{product?.description}</h2>
            <Button size="small" onClick={async () => {
                let request = {
                    products: [product?.id]
                };

                let response = await axios.post(`http://localhost:9091/carts`, request);
                response = await axios.get(`http://localhost:9091/carts/${response.data.id}`);
                setCart(response.data.carts[0])
            }}>Add to Cart</Button>
        </>
    )
}

export default ProductDetails;
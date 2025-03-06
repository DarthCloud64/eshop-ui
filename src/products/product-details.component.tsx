import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../models/product";

const ProductDetails = () => {
    let {productId} = useParams();
    const [product, setProduct] = useState<Product>();
    const [showErrorBanner, setShowErrorBanner] = useState(false);

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
        </>
    )
}

export default ProductDetails;
declare const window: any;

import { Alert, Button, Card, CardActions, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../models/product";
import { Link } from "react-router";

const productServiceUrl = import.meta.env.VITE_PRODUCT_SERVICE ?? window._env_.VITE_PRODUCT_SERVICE;

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                console.log("import.meta.env: ", import.meta.env); 
                console.log(`${productServiceUrl}/products`)
                let products = await axios.get(`${productServiceUrl}/products`);
                setProducts(products.data.products);
            }
            catch{
                
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            <h1>Products!!!</h1>
            <Grid2 container spacing={2}>
                {products && products.map && products.map((product) => (
                    <Grid2 size={4}>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <h3>{product.name}</h3>
                                <h4>${product.price.toFixed(2)}</h4>
                                {product.inventory < 10 ? <><Alert severity="error">Limited Inventory: {product.inventory}</Alert></> : <></>}
                            </CardContent>
                            <CardActions>
                                <Link to={`/products/${product.id}`}><Button size="small">View</Button></Link>
                                <Button size="small">Add to Cart</Button>
                            </CardActions>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
        </>
    )
}

export default Products;
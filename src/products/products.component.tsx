import { Button, Card, CardActions, CardContent, Container, Grid2, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../models/product";
import { Link } from "react-router";


const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showErrorBanner, setShowErrorBanner] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try{
                let products = await axios.get("http://localhost:9090/products");
                setProducts(products.data.products);
            }
            catch{
                setShowErrorBanner(true);
            }
        }

        fetchProducts();
    }, []);

    return (
        <>
            <h1>Products</h1>
            <Grid2 container spacing={2}>
                {products && products.map && products.map((product) => (
                    <Grid2 size={4}>
                        <Card variant="outlined" sx={{ minWidth: 275 }}>
                            <CardContent>
                                <h3>{product.name}</h3>
                                <h4>${product.price.toFixed(2)}</h4>
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
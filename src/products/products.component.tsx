declare const window: any;

import { Alert, Button, Card, CardActions, CardContent, Grid2 } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Product from "../models/product";
import { Link } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

const productServiceUrl = import.meta.env.VITE_PRODUCT_SERVICE ?? window._env_.VITE_PRODUCT_SERVICE;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? window._env_.VITE_AUTH0_AUDIENCE;

const Products = () => {
    const {getAccessTokenSilently} = useAuth0();
    const initialized = useRef(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        console.log(audience);
        const fetchProducts = async () => {
            try{
                const accessToken = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: audience
                    }
                })

                let products = await axios.get(`${productServiceUrl}/products`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setProducts(products.data.products);
            }
            catch{
                
            }
        }

        if (!initialized.current){
            initialized.current = true;
            fetchProducts();
        }
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
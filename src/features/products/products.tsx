declare const window: any;

import { Alert, Button, Card, CardActions, CardContent, CircularProgress, Grid2 } from "@mui/material";
import { Link } from "react-router";
import { useGetProductsQuery } from "../api/productApiSlice";

const Products = () => {
    const {data: products, isLoading, isSuccess, isError, error} = useGetProductsQuery()

    let content: React.ReactNode;

    if (isLoading) {
        content = <CircularProgress />
    }
    else if (isSuccess) {
        console.log(products);
        content =  <>{products.products && products.products.map((product) => (
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
        ))}</>
    }
    else if (isError){
        console.error(error);
        content = <div>{error.toString()}</div>
    }

    return (
        <>
            <h1>Products!!!</h1>
            <Grid2 container spacing={2}>
                {content}
            </Grid2>
        </>
    )
}

export default Products;
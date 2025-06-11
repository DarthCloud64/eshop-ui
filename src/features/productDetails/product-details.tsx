declare const window: any;

import { useParams } from "react-router";
import { Button, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { useGetProductByIdQuery } from "../api/productApiSlice";
import { AddProductToCartRequest, CreateCartResponse, useAddProductToCartMutation, useCreateCartMutation } from "../api/orderApiSlice";

const ProductDetails = () => {
    let { productId } = useParams();
    const cartId = useAppSelector(state => state.cart.cartId)
    const { data: products, isLoading: getProductByIdIsLoading, isSuccess, isError, error } = useGetProductByIdQuery(productId ?? "");
    const [createCartMut] = useCreateCartMutation();
    const [addProductToCartMut] = useAddProductToCartMutation();

    let content: React.ReactNode;

    if (getProductByIdIsLoading) {
        content = <CircularProgress />
    }
    else if (isSuccess) {
        content = <><h1 data-testid="product-name-header">{products.products[0].name}</h1>
            <h2>{products.products[0].description}</h2>
            <Button size="small" onClick={async () => {
                if (cartId === "") {
                    let createCartResponse: CreateCartResponse = await createCartMut().unwrap();
                    localStorage.setItem("user-cart", createCartResponse.id);

                    let addProductToCartRequest: AddProductToCartRequest = {
                        cart_id: createCartResponse.id,
                        product_id: products.products[0].id
                    };

                    await addProductToCartMut(addProductToCartRequest).unwrap();
                }
                else {
                    let addProductToCartRequest: AddProductToCartRequest = {
                        cart_id: cartId,
                        product_id: products.products[0].id
                    };

                    await addProductToCartMut(addProductToCartRequest).unwrap();
                }
            }}>Add to Cart</Button ></>
    }
    else if (isError) {
        console.error(error);
        content = <div>{error.toString()}</div>
    }

    return (
        <div data-testid="product-details-container">
            {content}
        </div>
    )
}

export default ProductDetails;
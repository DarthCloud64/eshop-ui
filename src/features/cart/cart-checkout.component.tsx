declare const window: any;

import { useEffect } from "react";
import { Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Product } from "../products/productsSlice";
import { useLazyGetProductByIdQuery } from "../api/productApiSlice";
import { RemoveProductFromCartRequest, useGetCartByIdQuery, useRemoveProductFromCartMutation } from "../api/orderApiSlice";
import { productsAndQuantitiesMapChanged } from "./cartSlice";

const CartCheckout = () => {
    const dispatch = useAppDispatch();
    const cartId = useAppSelector(state => state.cart.cartId);
    const productsAndQuantitiesMap = useAppSelector(state => state.cart.productsAndQuantitiesMap)
    const [removeProductFromCartMut, { isLoading }] = useRemoveProductFromCartMutation();
    const { data: getCartResponse, isLoading: getCartIsLoading, isFetching: getCartIsFetching } = useGetCartByIdQuery(cartId);
    const [getProductByIdQry] = useLazyGetProductByIdQuery();

    useEffect(() => {
        if (getCartResponse && getCartResponse.carts.length > 0 && getCartResponse.carts[0].products.size > 0) {
            Array.from(getCartResponse!.carts[0].products.entries()).map(([key, val]) => {
                getProductByIdQry(key).then(products => {
                    let map = new Map<Number, Product>();

                    if (products.data!.products[0]) {
                        map.set(val, products.data!.products[0]);
                    }

                    dispatch(productsAndQuantitiesMapChanged(map));
                })
            })
        }
        else {
            dispatch(productsAndQuantitiesMapChanged(new Map()));
        }
    }, [getCartResponse, getProductByIdQry, getCartIsFetching, getCartIsLoading]);

    const removeProductFromCart = async (productId: string) => {
        let removeProductFromCartRequest: RemoveProductFromCartRequest = {
            cart_id: cartId,
            product_id: productId,
        };

        await removeProductFromCartMut(removeProductFromCartRequest);
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody data-testid="checkout-items-1">
                        {Array.from(productsAndQuantitiesMap?.entries()).map(([key, val]) => (
                            <TableRow key={val.id.toString()}>
                                <TableCell>{val.name}</TableCell>
                                <TableCell><Button data-testid="checkout-remove-button" onClick={async () => await removeProductFromCart(val.id)}><RemoveIcon /></Button>{key.toString()}<Button><AddIcon /></Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isLoading ? <CircularProgress /> : <></>}
        </>
    )
}

export default CartCheckout;
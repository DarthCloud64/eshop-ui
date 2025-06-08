import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../products/productsSlice";

export interface Cart {
    id: string,
    products: Map<string, number>,
}

interface CartState {
    cartId: string,
    productsAndQuantitiesMap: Map<Number, Product>
}

const setInitialCartState = (): CartState => {
    return {
        cartId: localStorage.getItem("user-cart") || "",
        productsAndQuantitiesMap: new Map()
    };
}

const initialState: CartState = setInitialCartState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartCreated(state, action: PayloadAction<string>) {
            state.cartId = action.payload;
        },
        productsAndQuantitiesMapChanged(state, action: PayloadAction<Map<Number, Product>>) {
            state.productsAndQuantitiesMap = action.payload;
        }
    }
})

// export the actions
export const { cartCreated, productsAndQuantitiesMapChanged } = cartSlice.actions

// export the reducers
export default cartSlice.reducer
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { act } from "react";

export interface Product {
    id: String,
    name: String,
    price: number,
    description: String,
    inventory: number,
    stars: number,
    number_of_reviews: number,
}

const initialState: Product[] = []

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsAdded(_, action: PayloadAction<Product[]>) {
            return action.payload;
        }
    }
})

// export the actions
export const {productsAdded} = productsSlice.actions

// export the reducers
export default productsSlice.reducer
declare const window: any;

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Product {
    id: String,
    name: String,
    price: number,
    description: String,
    inventory: number,
    stars: number,
    number_of_reviews: number,
}

interface ProductsState {
    products: Product[],
    loading: string
}

const initialState: ProductsState = {
    products: [],
    loading: "idle"
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productsLoading(state, _: PayloadAction<ProductsState>){
            if(state.loading === "idle"){
                state.loading = "pending";
            }
        },
        productsAdded(state, action: PayloadAction<ProductsState>) {
            if(state.loading === "pending"){
                state.loading = "idle";
                state.products = action.payload.products;
            }
        }
    }
})

// export the actions
export const {productsLoading, productsAdded} = productsSlice.actions

// export the reducers
export default productsSlice.reducer

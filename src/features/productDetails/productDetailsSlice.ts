import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/productsSlice";

const initialState: Product = <Product>{};

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        productAdded(_, action: PayloadAction<Product>){
            return action.payload;
        }
    }
})

// export the actions
export const {productAdded} = productDetailsSlice.actions

// export the reducers
export default productDetailsSlice.reducer
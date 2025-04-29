import {configureStore} from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import productDetailsReducer from '../features/productDetails/productDetailsSlice'
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer
    }
});

// Friendly type exports for TypeScript
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

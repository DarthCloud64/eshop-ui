import {configureStore} from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import productDetailsReducer from '../features/productDetails/productDetailsSlice'
import cartReducer from '../features/cart/cartSlice'
import securityReducer from '../features/security/securitySlice'
import { productApiSlice } from '../features/api/productApiSlice';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer,
        security: securityReducer,
        [productApiSlice.reducerPath]: productApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(productApiSlice.middleware)
});

// Friendly type exports for TypeScript
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

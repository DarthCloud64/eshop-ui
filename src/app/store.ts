import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import productDetailsReducer from '../features/productDetails/productDetailsSlice'
import cartReducer from '../features/cart/cartSlice'
import securityReducer from '../features/security/securitySlice'
import { productApiSlice } from '../features/api/productApiSlice';
import { orderApiSlice } from '../features/api/orderApiSlice'

// Creating the root reducer separately so that the RootState type can be accessed
const rootReducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    security: securityReducer,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(productApiSlice.middleware)
            .concat(orderApiSlice.middleware),
    preloadedState
});

// Friendly type exports for TypeScript
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from '../products/productsSlice';
import { selectAccessToken } from '../security/securitySlice';
import { RootState } from '../../app/store';

const productServiceUrl = import.meta.env.VITE_PRODUCT_SERVICE ?? (window as any)._env_?.VITE_PRODUCT_SERVICE;

export interface GetProductsResponse {
    products: Product[]
}

export const productApiSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: productServiceUrl, prepareHeaders: (headers, { getState }) => {
            const state = getState();
            const token = selectAccessToken(state as RootState);
            headers.set("Authorization", `Bearer ${token}`);

            return headers;
        }
    }),
    endpoints: builder => ({
        getProducts: builder.query<GetProductsResponse, void>({
            query: () => "/products"
        }),
        getProductById: builder.query<GetProductsResponse, string>({
            query: (productId: string) => `/products/${productId}`
        })
    })
})

export const { useGetProductsQuery, useGetProductByIdQuery, useLazyGetProductByIdQuery } = productApiSlice
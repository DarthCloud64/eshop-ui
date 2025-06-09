import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectAccessToken } from "../security/securitySlice";
import { RootState } from '../../app/store';
import { Cart } from "../cart/cartSlice";

const orderServiceUrl = import.meta.env.VITE_ORDER_SERVICE ?? window._env_?.VITE_ORDER_SERVICE;

export interface RemoveProductFromCartRequest {
    cart_id: string,
    product_id: string
};

export interface AddProductToCartRequest {
    cart_id: string,
    product_id: string
};

export interface GetCartsResponse {
    carts: Cart[]
}

export interface CreateCartResponse {
    id: string
}

export const orderApiSlice = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: orderServiceUrl, prepareHeaders: (headers, { getState }) => {
            const state = getState();
            const token = selectAccessToken(state as RootState);
            headers.set("Authorization", `Bearer ${token}`);

            return headers;
        }
    }),
    tagTypes: ["Cart"],
    endpoints: builder => ({
        createCart: builder.mutation<CreateCartResponse, void>({
            query: () => ({
                url: '/carts',
                method: 'POST',
                body: {}
            }),
            invalidatesTags: ["Cart"]
        }),
        addProductToCart: builder.mutation<void, AddProductToCartRequest>({
            query: (requestObject) => ({
                url: '/carts/addProductToCart',
                method: 'PUT',
                body: requestObject
            }),
            invalidatesTags: ["Cart"]
        }),
        removeProductFromCart: builder.mutation<void, RemoveProductFromCartRequest>({
            query: (requestObject) => ({
                url: '/carts/removeProductFromCart',
                method: 'PUT',
                body: requestObject
            }),
            invalidatesTags: ["Cart"]
        }),
        getCartById: builder.query<GetCartsResponse, string>({
            query: (cartId: string) => `/carts/${cartId}`,
            transformResponse: (rawResponse: GetCartsResponse) => {
                const transformedCart: Cart = { ...rawResponse.carts[0] };
                transformedCart.products = new Map(Object.entries(transformedCart.products));

                return {
                    carts: [transformedCart]
                }
            },
            providesTags: ["Cart"]
        })
    })
});

export const { useCreateCartMutation, useAddProductToCartMutation, useRemoveProductFromCartMutation, useGetCartByIdQuery } = orderApiSlice;
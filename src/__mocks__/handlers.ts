import { http, HttpResponse } from 'msw';
import { beforeEach } from 'vitest';

const orderServiceUrl = "http://localhost/order";
const productServiceUrl = "http://localhost/product";

let mswCart: any = {
    id: "cart123",
    products: { "product123": 10 }
}

let mswProduct = {
    id: "product123",
    name: "laptop"
}

beforeEach(() => {
    console.debug("each executing");
    mswCart = {
        id: "cart123",
        products: { "product123": 10 }
    };

    mswProduct = {
        id: "product123",
        name: "laptop"
    };
})

// MSW (mock service worker) handlers
export const handlers = [
    http.get(`${orderServiceUrl}/carts/`, () => {
        return HttpResponse.json({
            carts: [
                mswCart
            ]
        })
    }),

    http.get(`${orderServiceUrl}/carts/:cartId`, (req) => {
        console.debug("msw cart " + mswCart.products.product123);
        return HttpResponse.json({
            carts: [
                mswCart
            ]
        })
    }),
    http.get(`${productServiceUrl}/products/:productId`, () => {
        return HttpResponse.json({
            products: [
                mswProduct
            ]
        })
    }),
    http.put(`${orderServiceUrl}/carts/removeProductFromCart`, () => {
        mswCart = {
            ...mswCart,
            products: {}
        }
    })
];

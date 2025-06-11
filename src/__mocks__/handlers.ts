import { http, HttpResponse } from 'msw';

const orderServiceUrl = "http://localhost/order";
const productServiceUrl = "http://localhost/product";

// MSW (mock service worker) handlers
export const handlers = [
    http.get(`${orderServiceUrl}/carts/`, () => {
        return HttpResponse.json({
            carts: [
                {
                    id: "cart123",
                    products: { "product123": 10 }
                }
            ]
        })
    }),

    http.get(`${orderServiceUrl}/carts/:cartId`, () => {
        return HttpResponse.json({
            carts: [
                {
                    id: "cart123",
                    products: { "product123": 10 }
                }
            ]
        })
    }),
    http.get(`${productServiceUrl}/products/:productId`, () => {
        return HttpResponse.json({
            products: [
                {
                    id: "product123",
                    name: "laptop"
                }
            ]
        })
    })
];

import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest'
import { setupServer } from 'msw/node';
import { handlers } from './__mocks__/handlers';

const orderServiceUrl = "http://localhost/order";
const productServiceUrl = "http://localhost/product";
const auth0Audience = "VITE_AUTH0_AUDIENCE";

// Mock the global import
vi.stubGlobal('import', {
    meta: {
        env: {
            VITE_AUTH0_AUDIENCE: auth0Audience,
            VITE_ORDER_SERVICE: orderServiceUrl,
            VITE_PRODUCT_SERVICE: productServiceUrl,
        }
    }
});

// Mock the global window
vi.stubGlobal('window', {
    ...window,
    location: {
        origin: ""
    },
    _env_: {
        VITE_AUTH0_AUDIENCE: auth0Audience,
        VITE_ORDER_SERVICE: orderServiceUrl,
        VITE_PRODUCT_SERVICE: productServiceUrl,
    }
});

// Create the mock service worker server
export const server = setupServer(...handlers);

// Before all tests
beforeAll(() => {
    server.listen();
})

// After each test
afterEach(() => {
    // Reset the MSW handlers
    server.resetHandlers();

    // Cleanup the DOM after each test
    cleanup();
})

// After all tests
afterAll(() => {
    server.close();
})
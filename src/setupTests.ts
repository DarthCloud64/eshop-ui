import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest'

// Mock the global import
vi.stubGlobal('import', {
    meta: {
        env: {
            VITE_AUTH0_AUDIENCE: 'VITE_AUTH0_AUDIENCE',
            VITE_ORDER_SERVICE: 'VITE_ORDER_SERVICE',
            VITE_PRODUCT_SERVICE: 'VITE_PRODUCT_SERVICE'
        }
    }
});

// Mock the global window
vi.stubGlobal('window', {
    ...window,
    _env_: {
        VITE_AUTH0_AUDIENCE: 'VITE_AUTH0_AUDIENCE',
        VITE_ORDER_SERVICE: 'VITE_ORDER_SERVICE',
        VITE_PRODUCT_SERVICE: 'VITE_PRODUCT_SERVICE'
    }
});

// After each test
afterEach(() => {
    // Cleanup the DOM after each test
    cleanup();
})
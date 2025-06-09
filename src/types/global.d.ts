interface AppEnvironmentVariables {
    VITE_AUTH0_AUDIENCE: string;
    VITE_PRODUCT_SERVICE: string;
    VITE_ORDER_SERVICE: string;
}

declare global {
    interface Window {
        _env_?: AppEnvironmentVariables;
    }
}

export { };
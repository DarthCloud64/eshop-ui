import { vi } from 'vitest';

// Export a mock of the useAuth0 hook
export const useAuth0 = vi.fn(() => ({
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: false,
    user: {},
    getAccessTokenSilently: vi.fn(),
}));

// Export a mock of the Auth0Provider
export const Auth0Provider = ({ children }: { children: React.ReactNode }) => {
    <>{children}</>;
};
import { beforeEach, describe, expect, it, MockedFunction, vi } from 'vitest';

vi.mock('@auth0/auth0-react');

import { screen } from '@testing-library/react';
import { renderWithProviders } from './utilities/test-utils';
import { useAuth0 } from '@auth0/auth0-react';
import App from './App';

const mockUseAuth0 = useAuth0 as MockedFunction<typeof useAuth0>;

describe("App", () => {
    beforeEach(() => {
        mockUseAuth0.mockClear();

        mockUseAuth0.mockReturnValue({
            isAuthenticated: false, // Default to not logged in
            isLoading: false, // Default to not loading
            error: undefined, // Default to no error
            user: undefined, // Default to no user
            loginWithRedirect: vi.fn(), // Ensure this is a spy
            logout: vi.fn(), // Ensure this is a spy
            getAccessTokenSilently: vi.fn(), // Mock async functions
            getAccessTokenWithPopup: vi.fn(),
            getIdTokenClaims: vi.fn(),
            handleRedirectCallback: vi.fn(),
            loginWithPopup: vi.fn()
        });
    })

    it("renders the login button when the user is not logged in", () => {
        // Arrange
        // Act
        renderWithProviders(<App />);

        // Assert
        const loginButton = screen.getByText("Login");
        expect(loginButton).toBeInTheDocument();
    });

    it("redirects the user to the Auth0 SSO page when the login button is clicked", async () => {
        // Arrange
        // Act
        renderWithProviders(
            <App />
        );
        const loginButton = screen.getByText("Login");
        loginButton.click();

        // Assert
        const { loginWithRedirect } = mockUseAuth0.mock.results[0].value;
        expect(loginWithRedirect).toHaveBeenCalled();
    });

    it("renders the routes when the user is logged in", () => {
        // Arrange
        mockUseAuth0.mockReturnValue({
            isAuthenticated: true, // Default to not logged in
            isLoading: false, // Default to not loading
            error: undefined, // Default to no error
            user: undefined, // Default to no user
            loginWithRedirect: vi.fn(), // Ensure this is a spy
            logout: vi.fn(), // Ensure this is a spy
            getAccessTokenSilently: vi.fn(), // Mock async functions
            getAccessTokenWithPopup: vi.fn(),
            getIdTokenClaims: vi.fn(),
            handleRedirectCallback: vi.fn(),
            loginWithPopup: vi.fn()
        });

        // Act
        renderWithProviders(<App />);

        // Assert
        const logoutButton = screen.getByText("Logout");
        expect(logoutButton).toBeInTheDocument();
    });

    it("logs the user out when the logout button is clicked", () => {
        // Arrange
        mockUseAuth0.mockReturnValue({
            isAuthenticated: true, // Default to not logged in
            isLoading: false, // Default to not loading
            error: undefined, // Default to no error
            user: undefined, // Default to no user
            loginWithRedirect: vi.fn(), // Ensure this is a spy
            logout: vi.fn(), // Ensure this is a spy
            getAccessTokenSilently: vi.fn(), // Mock async functions
            getAccessTokenWithPopup: vi.fn(),
            getIdTokenClaims: vi.fn(),
            handleRedirectCallback: vi.fn(),
            loginWithPopup: vi.fn()
        });

        // Act
        renderWithProviders(<App />);
        const logoutButton = screen.getByText("Logout");
        logoutButton.click();

        // Assert
        const { logout } = mockUseAuth0.mock.results[0].value;
        expect(logout).toHaveBeenCalled();
    });
});
import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { renderWithProviders } from './utilities/test-utils';

describe("App", () => {
    it("renders the login button when the user is not logged in", () => {
        // Arrange
        renderWithProviders(<App />);

        // Act
        const loginButton = screen.getByText("Login");

        // Assert
        expect(loginButton).toBeInTheDocument();
    });
});
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../utilities/test-utils';
import { screen, waitFor } from '@testing-library/react';
import CartCheckout from './cart-checkout.component';

describe("CartCheckout", () => {
    it("displays an empty checkout table when no items exist in the cart", () => {
        // Arrange
        // Act
        renderWithProviders(<CartCheckout />);

        // Assert
        const tableBody = screen.getByTestId("checkout-items-1");
        expect(tableBody).toBeInTheDocument();
        expect(tableBody).toBeEmptyDOMElement();
    });

    it("displays checkout table when items exist in the cart", async () => {
        // Arrange
        const preloadedState = {
            cart: {
                cartId: "cart123",
                productsAndQuantitiesMap: new Map()
            }
        };

        // Act
        renderWithProviders(<CartCheckout />, {
            preloadedState: preloadedState
        });

        const tableBody = screen.getByTestId("checkout-items-1");

        // Assert
        await waitFor(() => {
            expect(tableBody).toBeInTheDocument();
            expect(tableBody).not.toBeEmptyDOMElement();
        }, { timeout: 5000, container: tableBody })
    });
});
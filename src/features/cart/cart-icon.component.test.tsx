import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '../../utilities/test-utils';
import CartIcon from './cart-icon.component';
import { screen } from '@testing-library/react';

describe("CartIcon", () => {
    it("displays the shopping cart icon", () => {
        // Arrange
        // Act
        renderWithProviders(<CartIcon />);

        // Assert
        const shoppingCartIcon = screen.getByRole("button");
        expect(shoppingCartIcon).toBeInTheDocument();
    });

    it("displays the shopping cart icon with an item added to the cart", () => {
        // Arrange
        const preloadedState = {
            cart: {
                cartId: "cart123",
                productsAndQuantitiesMap: new Map()
            }
        };

        // Act
        renderWithProviders(<CartIcon />, {
            preloadedState: preloadedState
        });

        // Assert
        const shoppingCartIcon = screen.getByRole("button");
        expect(shoppingCartIcon).toBeInTheDocument();
    });
});
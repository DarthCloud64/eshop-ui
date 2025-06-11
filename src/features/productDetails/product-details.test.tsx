import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../utilities/test-utils";
import ProductDetails from "./product-details";
import { MemoryRouter, Route, Routes } from "react-router";
import { screen, waitFor } from "@testing-library/dom";

describe("ProductDetails", () => {
    it("displays product details", async () => {
        // Arrange
        const productId = "product123";

        // Act
        renderWithProviders(
            <MemoryRouter initialEntries={[`/products/${productId}`]}>
                <Routes>
                    <Route path="/products/:productId" element={<ProductDetails />} />
                </Routes>
            </MemoryRouter>
        );

        const container = screen.getByTestId("product-details-container");

        // Assert
        await waitFor(() => {
            const productNameH1 = screen.getByTestId("product-name-header");
            expect(productNameH1).toBeInTheDocument();
            expect(productNameH1).toHaveTextContent("laptop");
        }, { timeout: 5000, container: container });
    });
});
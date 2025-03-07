import { createContext } from "react";
import Cart from "../models/cart";

export interface CartContextModel {
    cart: Cart,
    setCart: () => {}
}

export const CartContext = createContext<CartContextModel | undefined>(undefined);
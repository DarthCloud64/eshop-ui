import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Product } from "../products/productsSlice"

interface Cart {
    id: String,
    products: Map<String, number>,
}

interface CartState {
    cart: Cart,
    cartProducts: Map<Number, Product>
}

const setInitialCartState = (): CartState => {
    try {
        const savedCart = JSON.parse(localStorage.getItem("user-cart") || "");
        savedCart.products = new Map(Object.entries(savedCart.products));
  
        return {
            cart: savedCart,
            cartProducts: new Map()
        }
      }
      catch (error) {
        console.log(error);
        
        return {
            cart: {id: "", products: new Map()},
            cartProducts: new Map()
        }
      }
}

const initialState: CartState = setInitialCartState();

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartProductsAdded(state, action: PayloadAction<Map<Number, Product>>) {
            state.cartProducts = action.payload
        },
        cartChanged(state, action: PayloadAction<Cart>) {
            state.cart = action.payload
        }
    }
})

// export the actions
export const {cartProductsAdded, cartChanged} = cartSlice.actions

// export the reducers
export default cartSlice.reducer
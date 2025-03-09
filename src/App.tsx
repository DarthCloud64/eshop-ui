import { useState } from 'react'
import './App.css'
import CartIcon from './carts/cart-icon.component'
import Products from './products/products.component'
import ProductDetails from './products/product-details.component'
import Cart from './models/cart'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  const [count, setCount] = useState(0);
  const [cart, setCart] = useState<Cart>(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("user-cart") || "");
      return savedCart;
    }
    catch (error) {
      return {id: "", products: []}
    }
});

  return (
    <>
      <CartIcon cart={cart}/>
      <BrowserRouter>
        <Routes>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:productId" element={<ProductDetails cart={cart} setCart={setCart}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

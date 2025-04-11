import { useEffect, useState } from 'react'
import './App.css'
import CartIcon from './carts/cart-icon.component'
import Products from './products/products.component'
import ProductDetails from './products/product-details.component'
import Cart from './models/cart'
import { BrowserRouter, Route, Routes, Link as RouterLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Grid2, Link } from '@mui/material'
import CartCheckout from './carts/cart-checkout.component'

const App = () => {
  const [cart, setCart] = useState<Cart>(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("user-cart") || "");
      savedCart.products = new Map(Object.entries(savedCart.products));

      return savedCart;
    }
    catch (error) {
      return {id: "", products: []}
    }
  });

  useEffect(() => {
    if(cart && cart.products  && !(cart.products instanceof Map)) {
      cart.products = new Map(Object.entries(cart.products));
    }
  }, [cart])

  const {loginWithRedirect, logout, isAuthenticated, user} = useAuth0();
  
  if(!isAuthenticated){
      return  (
        <>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </>
    )
  }

  return (
    <>
      <BrowserRouter>
        <Grid2 container spacing={2}>
        <Grid2 size={2}>
            <button onClick={() => logout({logoutParams: {returnTo: window.location.origin}})}>Logout</button>
          </Grid2>
          <Grid2 size={2}>
            <h3>{user?.name}</h3>
          </Grid2>
          <Grid2 size={2}>
            <h3>{user?.email}</h3>
          </Grid2>
          <Grid2 size={2}>
            <Link component={RouterLink} to="/cart/checkout"><CartIcon cart={cart}/></Link>
          </Grid2>
          <Grid2 size={2}>
            <Link component={RouterLink} to="/products">Products</Link>
          </Grid2>
        </Grid2>

        <Routes>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:productId" element={<ProductDetails cart={cart} setCart={setCart}/>}/>
          <Route path="/cart/checkout" element={<CartCheckout cart={cart} />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

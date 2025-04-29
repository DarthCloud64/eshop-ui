import { useEffect } from 'react'
import './App.css'
import Products from './features/products/products'
import ProductDetails from './features/productDetails/product-details'
import { BrowserRouter, Route, Routes, Link as RouterLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Grid2, Link } from '@mui/material'
import CartCheckout from './features/cart/cart-checkout.component'
import CartIcon from './features/cart/cart-icon.component'
import { useAppSelector } from './app/hooks'

const App = () => {
  const cart = useAppSelector(state => state.cart);

  useEffect(() => {
    if(cart.cart && cart.cart.products  && !(cart.cart.products instanceof Map)) {
      cart.cart.products = new Map(Object.entries(cart.cart.products));
    }
  }, [cart.cart])

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
            <Link component={RouterLink} to="/cart/checkout"><CartIcon/></Link>
          </Grid2>
          <Grid2 size={2}>
            <Link component={RouterLink} to="/products">Products</Link>
          </Grid2>
        </Grid2>

        <Routes>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:productId" element={<ProductDetails/>}/>
          <Route path="/cart/checkout" element={<CartCheckout />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

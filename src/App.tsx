
import { useEffect } from 'react'
import './App.css'
import Products from './features/products/products'
import ProductDetails from './features/productDetails/product-details'
import { BrowserRouter, Route, Routes, Link as RouterLink } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Grid2, Link } from '@mui/material'
import CartCheckout from './features/cart/cart-checkout.component'
import CartIcon from './features/cart/cart-icon.component'
import { useAppDispatch } from './app/hooks'
import { tokenFetched } from './features/security/securitySlice';

const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? (window as any)._env_?.VITE_AUTH0_AUDIENCE;

const App = () => {
  const dispatch = useAppDispatch();
  const { loginWithRedirect, logout, isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: audience
          }
        });

        dispatch(tokenFetched(accessToken));
      }
      catch (e) {
        console.error(e);
      }
    })()
  }, [getAccessTokenSilently])

  if (!isAuthenticated) {
    return (
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
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button>
          </Grid2>
          <Grid2 size={2}>
            <h3>{user?.name}</h3>
          </Grid2>
          <Grid2 size={2}>
            <h3>{user?.email}</h3>
          </Grid2>
          <Grid2 size={2}>
            <Link component={RouterLink} to="/cart/checkout"><CartIcon /></Link>
          </Grid2>
          <Grid2 size={2}>
            <Link component={RouterLink} to="/products">Products</Link>
          </Grid2>
        </Grid2>

        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart/checkout" element={<CartCheckout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

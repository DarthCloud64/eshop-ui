import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Products from './products/products.component.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import ProductDetails from './products/product-details.component.tsx'
import { CartContext } from './carts/cart.context.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartContext value={undefined}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme/>
        <BrowserRouter>
          <Routes>
            <Route index element={<App/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:productId" element={<ProductDetails/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </CartContext>
  </StrictMode>,
)

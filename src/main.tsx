import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Auth0Provider } from '@auth0/auth0-react'

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0Client = import.meta.env.VITE_AUTH0_CLIENT_ID;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider domain={auth0Domain} clientId={auth0Client} authorizationParams={{redirect_uri: window.location.origin}} cacheLocation="localstorage">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme/>
        <App/>
      </ThemeProvider>
    </Auth0Provider>
  </StrictMode>,
)

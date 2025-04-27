declare const window: any;

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { Auth0Provider } from '@auth0/auth0-react'
import {Provider} from 'react-redux'
import { store } from './app/store.ts';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0Client = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE ?? window._env_.VITE_AUTH0_AUDIENCE;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider 
        domain={auth0Domain} 
        clientId={auth0Client} 
        authorizationParams={
          {
            redirect_uri: window.location.origin,
            audience: audience
          }} 
        cacheLocation="localstorage">

        <ThemeProvider theme={darkTheme}>
          <CssBaseline enableColorScheme/>
          <App/>
        </ThemeProvider>
      </Auth0Provider>
    </Provider>
  </StrictMode>,
)

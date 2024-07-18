import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App.jsx'
import './index.css'
import ShoppingContextProvider from './Contexts/ShoppingContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

    <Auth0Provider domain="dev-rnoilkrmxdd0sil1.us.auth0.com" clientId="HubcpdDk7oo3p7tftaDjGpDqyq3zuxE8">

      <ShoppingContextProvider>
        <App />
      </ShoppingContextProvider>

  </Auth0Provider>
)

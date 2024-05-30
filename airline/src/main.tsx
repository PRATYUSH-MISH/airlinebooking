import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Assuming App component is defined in App.tsx or App.jsx
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = process.env.REACT_APP_AUTH0_DOMAIN!;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID!;

if (!domain || !clientId) {
  throw new Error('Missing Auth0 configuration in environment variables');
}

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);

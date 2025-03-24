import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChakraProvider } from "@chakra-ui/react";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { theme } from "./Componets/Theme";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/Redux/Store/Index";

import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.AUTH0_ISSUER_BASE_URL;
const clientID = process.env.AUTH0_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Auth0Provider
    domain={domain}
    clientId={clientID}
    authorizationParams={{
      redirect_uri: "http://localhost:3000/createAuth0",
      // audience: "http://animales.com",
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
  // </React.StrictMode>
);

reportWebVitals();

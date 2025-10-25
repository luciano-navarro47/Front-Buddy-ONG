import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "redux/store/Index";
import { Auth0Provider } from "@auth0/auth0-react";

import { ChakraProvider } from "@chakra-ui/react";

import App from "./app"
import reportWebVitals from "./reportWebVitals";
import { theme } from "components/commons/theme";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin + "/",
      audience: "https://dev-oad6u8oyio8a678i.us.auth0.com/api/v2/",
    }}
    cacheLocation="localstorage"
    useRefreshTokens={true}
  >
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);

reportWebVitals();

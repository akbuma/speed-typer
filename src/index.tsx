import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ScoreProvider } from "./contexts/ScoreContext";
import { Auth0Provider } from "@auth0/auth0-react";
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-z0nxbt5z.us.auth0.com"
      clientId="E4D8LsYvtVMnDoO0mH6Y6IkPssQ6bo2x"
      redirectUri={window.location.origin}
      audience="https://speedtyperapi/"
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

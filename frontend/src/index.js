import "@fontsource/inter/700.css";
import "@fontsource/inter/900.css";
import "@fontsource-variable/vazirmatn";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./styles/globals.css";

import App from "./App";
import { UsedMarketProvider } from "./context/UsedMarketContext";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <UsedMarketProvider>
      <App />
    </UsedMarketProvider>
  </BrowserRouter>
);
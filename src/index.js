import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import * as React from "react";
import { HashRouter } from "react-router-dom";
 const container = document.getElementById("root");

 let root = createRoot(container);

root.render(
  <StrictMode>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </StrictMode>
);


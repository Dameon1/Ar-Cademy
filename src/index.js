import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");

let root = createRoot(container);

root.render(
  <StrictMode>
    <Router basename="/Ar-Cademy">
      <App />
    </Router>
  </StrictMode>
);

//const root = createRoot(root);

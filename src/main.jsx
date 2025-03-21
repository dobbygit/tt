import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TempoDevtools } from "tempo-devtools";

// Initialize Tempo Devtools
if (import.meta.env.VITE_TEMPO === "true") {
  TempoDevtools.init();
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

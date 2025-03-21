import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

// Only initialize Tempo in Tempo environment
if (import.meta.env.VITE_TEMPO === "true") {
  try {
    import("tempo-devtools")
      .then(({ TempoDevtools }) => {
        TempoDevtools.init();
      })
      .catch((err) => {
        console.warn("Could not initialize Tempo Devtools:", err);
      });
  } catch (e) {
    console.warn("Could not load Tempo Devtools, continuing without it");
  }
}

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

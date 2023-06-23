import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Store } from "./state/rootState";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>
);

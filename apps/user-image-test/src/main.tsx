import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserDisplay } from "data-visuals";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserDisplay />
  </React.StrictMode>
);

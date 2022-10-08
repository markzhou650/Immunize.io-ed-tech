import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HelloComponent from "./components/HelloComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelloComponent />
  </React.StrictMode>
);

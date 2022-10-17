import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import ChatBox from "./components/ChatBox";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import AppProvider  from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ChatBox /> */}
    <AppProvider>
      <Navbar />
      <Container />
    </AppProvider>
  </React.StrictMode>
);

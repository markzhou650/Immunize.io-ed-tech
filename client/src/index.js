import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import ChatBox from "./components/ChatBox";
import Container from "./components/Container";
import Navbar from "./components/Pages/Navbar";
import AppProvider from "./context";
import Admin from "./components/Admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ChatBox /> */}
    <AppProvider>
      <App />
      {/* <Navbar /> */}
      <Container />
    </AppProvider>
    <Admin />
  </React.StrictMode>
);

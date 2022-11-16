import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Pages/Navbar"
import Home from "./components/Pages/Home";
// import Admin from "./components/Pages/Admin";

export default function App() {
    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/admin" element={<Admin />}></Route> */}
        </Routes>
      </BrowserRouter>
    );
  }

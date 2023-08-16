import React from "react";
import "./App.css";
import Header from "./components/layout/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/home/Home";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;

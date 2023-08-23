import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";
import NewProducts from "./components/productDetails/products/NewProducts";
import Search from "./components/productDetails/search/Search";
import LoginSignUp from "./components/user/LoginSignUp";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           <Route exact path="/" element={<LoginSignUp />} />
          <Route exact path="/Dashboard" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<NewProducts />} />
          <Route exact path="/search" element={<Search />} />
          {/* <Route exact path="/login" element={<LoginSignUp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

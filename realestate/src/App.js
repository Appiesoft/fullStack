import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ProductDetails from "./components/productDetails/ProductDetails";
import NewProducts from "./components/productDetails/products/NewProducts";
import Search from "./components/productDetails/search/Search";
import LoginSignUp from "./components/user/LoginSignUp";

import { loadUser } from "./thunk/actions/userAction";
import store from "./store/Store";
import UserOptions from "./components/layout/header/userOption/UserOptions";
import { useSelector } from "react-redux";
import ProfileDetails from "./components/user/profileDetails/ProfileDetails";
const App = () => {
const {isAuthenticated,user } = useSelector(state=>
  state.user
)
  useEffect(() => {
    store.dispatch(loadUser());
  
 
  }, [])
  
  return (
    <div>
      <BrowserRouter>
      {isAuthenticated && <UserOptions user={user}/>}
        <Routes>
       
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/dashboard" element={<NewProducts />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/account" element={<ProfileDetails />} />
          {/* <Route exact path="/login" element={<LoginSignUp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

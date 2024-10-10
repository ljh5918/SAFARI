import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Sell from "./pages/sell/Sell";
import Product from "./components/product/Product";
import ProductDetail from "./components/product/ProductDetail";
import ProductPage from "./pages/ProductPage/ProductPage";
import Footer from "./components/footer/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';




import SearchResult from './components/header/SearchResult';


import MyPage from './pages/MyPage/MyPage'; 
import UserProfile from './pages/MyPage/UserProfile'; 
import Chat from './pages/MyPage/Chat';
import EditProduct from './pages/MyPage/EditProducts';
// import FindId from './pages/auth/FindId';


function App() {
  console.log("App component rendered");
 

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Product />
            </>
          }
        />
        <Route path="/auth" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<ProductPage />} />
        
        
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/Edit-Products/:id" element={<EditProduct />} />
        <Route path="/Product" element={<> <Home /> <Product /> </>} />
        {/* <Route path="/FindId" element={<FindId />} /> */}

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
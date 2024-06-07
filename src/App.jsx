import React, { useState } from 'react'; 

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Sell from "./pages/sell";

// import { Routes, Route, BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Provider } from "react-redux"; 
import store from "./store/store";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Electronic from "./components/electronic/Electronic";
import ProductComponent from "./components/product/ProductComponent";
import Footer from "./components/footer/Footer";


export const ProductContext = React.createContext();


function App() {
  const [products, setProducts] = useState([]);

  return (
    // <Provider store={store}>
    <ProductContext.Provider value={{ products, setProducts }}>  
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home />
                <ProductComponent />
                <Electronic />
              </>
            }
          />
          <Route path="/auth" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Sell" element={<Sell/>}/>
          
        </Routes>
        <Footer />
      </Router>
      </ProductContext.Provider>
      /* </Provider> */
 
  );
}

export default App;

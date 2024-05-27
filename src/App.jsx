
import Main from './pages/Main';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Mypage from './pages/Mypage';
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
import Auth from "./pages/auth/Auth";



function App() {
  return (
    
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Main />} />
    //     <Route path="/Signup" element={<Signup />} />
    //     <Route path="/Login" element={<Login />} />
    //     <Route path="/Mypage" element={<Mypage/>} />
    
    //   </Routes>
    // </BrowserRouter> 
    



    // <Provider store={store}>
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
        </Routes>
        <Footer />
      </Router>
    // </Provider>
  );
}

export default App;

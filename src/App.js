import Main from './Main/Main';
import Signup from "./Signup/Signup";
import Login from "./login/Login";
import Mypage from './Mypage/Mypage';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';




function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Mypage" element={<Mypage/>} />
    
      </Routes>
    </BrowserRouter> 
    
  );
}

export default App;

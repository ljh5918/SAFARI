import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Main = () => {

  const navigate = useNavigate();
  const goTologin = () => {
    navigate("/Login");
  }
  
  const goTosignup = () => {
    navigate("/Signup");
  }
  
  const goToMypage = () => {
    navigate("/Mypage")
  }

  return (
    <div>
      <button onClick={goTologin}>로그인</button>
      <button onClick={goTosignup}>회원가입</button>
      <button onClick={goToMypage}>마이페이지</button>
    </div>
  ); 
}

export default Main;
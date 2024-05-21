import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
//import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.css';
import kakaoimg from "../images/Kakao.png"
import {Button,Form, Container,Row,Col} from 'react-bootstrap';
//import styles from '../css/Login.module.css';
import '../login/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const navigate = useNavigate();
  const goTomain = () => {
    navigate("/");
  }
  
  const goTosignup = () => {
    navigate("/signup");
  }





  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = () => {
    // 로그인 로직 구현
    console.log('아이디:', formData.username);
    console.log('비밀번호:', formData.password);
  };

   //KakaoLogin
   const Kakao_api_key='c8cb40a0c1a835d8356e3af7356b904a' //REST API KEY
   const Kakao_redirect_uri = 'http://localhost:3000' //Redirect URI
   // oauth 요청 URL
   const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_api_key}&redirect_uri=${Kakao_redirect_uri}&response_type=code`
   const KakaoLogin = ()=>{
       window.location.href = kakaoURL;
   }
   
   //NaverLogin
   const Naver_api_key='XOb1McV2fMC4K8R8RwHP'; //Client ID
   const Naver_redirect_uri = 'http://localhost:3000'; //Callback URI
   const Naver_state ="MOin1vDy_4";  //Client Secret

   const NaverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${Naver_api_key}&response_type=code&redirect_uri=${Naver_redirect_uri}&state=${Naver_state}`;
   const NaverLogin = () => {
     window.location.href = NaverURL;
   }



  return (
    
    
    <div className="login-container">
       <h1 className='title'>SAFARI</h1>
       <div className="border-container">
      <form className = 'loginForm'onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
     
       
          <Form.Control
            type="text"
            // className="userid"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required placeholder='아이디'
            autoFocus
          />
          <Form.Control
            type= "password"
            // className="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required placeholder='비밀번호'
          />
        
        <Button className='login-btn' type='submit' onClick={goTomain}>로그인</Button>
      </form>
      <div className="id-login-signup-link">
        <a c href="#">아이디 찾기 | </a>
        <a  href="#">비밀번호 찾기 | </a>
        <a  href="#" onClick={goTosignup}>회원가입</a>
      </div>
      <div>
        <button className='kakao-login-btn' onClick={KakaoLogin}>카카오 아이디 로그인</button>
        {/* 카카오 이미지 버튼 */}
        {/* <button type='button' onClick={KakaoLogin}><img src={kakaoimg} alt="카카오로그인" /></button> */}
      <div>
        <button className='naver-login-btn' onClick={NaverLogin}>네이버 아이디 로그인</button>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
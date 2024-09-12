import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import kakaoimg from "../../images/kakaologin.png";
import naverimg from "../../images/naverlogin.png";
import {Button,Form, Container,Row,Col} from 'react-bootstrap';
import styles from '../../styles/Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const goTosignup = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    //로그인 로직 구현
    // 로컬 스토리지에서 저장된 ID와 비밀번호 가져오기
    e.preventDefault();
    const storedID = localStorage.getItem('id');
    const storedPassword = localStorage.getItem('password');
    const storedNickname = localStorage.getItem('nickname');

    // 입력한 ID와 비밀번호와 저장된 ID와 비밀번호 비교
    if (formData.id === storedID && formData.password === storedPassword) {
      localStorage.setItem('isLoggedIn', 'true'); 
      localStorage.setItem('userId', storedNickname);
        navigate("/");  // 일치하면 메인 페이지로 이동
    } else {
        alert('회원정보가 없습니다.');  // 일치하지 않으면 알림창 띄우고 페이지 넘어가지 않음
        setFormData({ username: '', password: '' });
    }
  };

  // KakaoLogin
  const Kakao_api_key = 'c8cb40a0c1a835d8356e3af7356b904a'; // REST API KEY
  const Kakao_redirect_uri = 'http://localhost:3000'; // Redirect URI
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_api_key}&redirect_uri=${Kakao_redirect_uri}&response_type=code`;
  const KakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  // NaverLogin
  const Naver_api_key = 'XOb1McV2fMC4K8R8RwHP'; // Client ID
  const Naver_redirect_uri = 'http://localhost:3000'; // Callback URI
  const Naver_state = "MOin1vDy_4"; // Client Secret
  const NaverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${Naver_api_key}&response_type=code&redirect_uri=${Naver_redirect_uri}&state=${Naver_state}`;
  const NaverLogin = () => {
    window.location.href = NaverURL;
  };

  

  return (
    <div className={styles.container}>
      {/* <h1 className={styles.title}>SAFARI</h1> */}
      <div className={styles.logincontainer}>
        <h3 className={styles.logintitle}>로그인</h3>
        <h6 className={styles.logintitleex}>시리얼 넘버를 통한 안전한 중고거래</h6>
        <form className={styles.loginform} onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <Form.Control
            type="text"
            className={styles.userid}
            name="id"
            value={formData.id}
            onChange={handleChange}
            required placeholder='아이디'
            autoFocus
          />
          <Form.Control
            type="password"
            className={styles.userpw}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required placeholder='비밀번호'
          />
          
          <button className={styles.loginbtn} type='submit' onClick={handleSubmit}>로그인</button>
          {/* <Button className={styles.loginbtn} type='submit' onClick={handleSubmit}>로그인</Button> */}
        </form>
        <div className={styles.signuplink}>
          <a href="#" onClick={goTosignup}>회원가입</a>
        </div>
        <p className={styles.snstitle}>---------------------------   소셜 로그인   ---------------------------</p>
        <div className={styles.snsbtn}>
          <button className={styles.kakaologinbtn} type='button' onClick={KakaoLogin}>
            <img src={kakaoimg} alt="카카오로그인" />
          </button>
          <button className={styles.naverloginbtn} type='button' onClick={NaverLogin}>
            <img src={naverimg} alt="네이버 아이디 로그인" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
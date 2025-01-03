import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kakaoimg from '../../images/kakaologin.png';
import naverimg from '../../images/naverlogin.png';
import { Button, Form, Modal as BootstrapModal } from 'react-bootstrap';
import styles from '../../styles/Login.module.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    email: ''
  });

  const [loginError, setLoginError] = useState('');
  const [showModal, setShowModal] = useState(false); 
  const [email, setEmail] = useState(''); 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/members/login', {
        email: formData.id,
        password: formData.password
      });
      

    
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('memberId', response.data.memberId); 
      console.log(response.data.token); // 토큰 확인
      localStorage.setItem('isLoggedIn', 'true'); 
      
      navigate("/");
    } catch (error) {
      alert("아이디 또는 비밀번호를 확인해주세요");
      setFormData({ id: '', password: '' });
    }
  };





  const handlePasswordFind = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/members/sendEmail?memberEmail=${email}`);
      alert(response.data); // 성공 메시지
      setShowModal(false); // 모달 닫기
      setEmail(''); // 입력값 초기화
    } catch (error) {
      alert('이메일 전송에 실패하였습니다.'); // 오류 메시지
    }
  };
  
  // KakaoLogin
  const Kakao_api_key = 'c8cb40a0c1a835d8356e3af7356b904a'; 
  const Kakao_redirect_uri = 'http://localhost:3000'; 
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Kakao_api_key}&redirect_uri=${Kakao_redirect_uri}&response_type=code`;
  const KakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  // NaverLogin
  const Naver_api_key = 'XOb1McV2fMC4K8R8RwHP'; 
  const Naver_redirect_uri = 'http://localhost:3000'; 
  const Naver_state = "MOin1vDy_4"; 
  const NaverURL = `https://nid.naver.com/oauth2.0/authorize?client_id=${Naver_api_key}&response_type=code&redirect_uri=${Naver_redirect_uri}&state=${Naver_state}`;
  const NaverLogin = () => {
    window.location.href = NaverURL;
  };

  return (
    <div className={styles.container}>
      <div className={styles.logincontainer}>
        <h3 className={styles.logintitle}>로그인</h3>
        <h6 className={styles.logintitleex}>시리얼 넘버를 통한 안전한 중고거래</h6>
        {loginError && <p className={styles.error}>{loginError}</p>}
        <form className={styles.loginform} onSubmit={handleSubmit}>
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
          <button className={styles.loginbtn} type='submit'>로그인</button>
        </form>
        <div className={styles.signuplink}>
          <a href="#" onClick={goTosignup}>회원가입/</a> 
          <a href="#" onClick={() => setShowModal(true)}> 비밀번호 찾기</a> {/* 비밀번호 찾기 버튼 */}
        </div>
        {/* <p className={styles.snstitle}>---------------------------   소셜 로그인   ---------------------------</p>
        <div className={styles.snsbtn}>
          <button className={styles.kakaologinbtn} type='button' onClick={KakaoLogin}>
            <img src={kakaoimg} alt="카카오로그인" />
          </button>
          <button className={styles.naverloginbtn} type='button' onClick={NaverLogin}>
            <img src={naverimg} alt="네이버 아이디 로그인" />
          </button>
        </div> */}
      </div>

      {/* 비밀번호 찾기 모달 */}
      <BootstrapModal show={showModal} onHide={() => setShowModal(false)}>
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>비밀번호 찾기</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>이메일 주소를 입력하세요</Form.Label>
              <Form.Control
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={handlePasswordFind}>
            비밀번호 전송
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </div>
  );
};

export default Login;

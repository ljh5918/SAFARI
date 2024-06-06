import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const AuthButton = ({ scrollToTop }) => {

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const navigate = useNavigate();
  
    const handleLogout = () => {
      // 로그아웃 처리: 로컬 스토리지에서 로그인 상태 제거
      localStorage.removeItem('isLoggedIn');
      navigate("/"); //로그아웃 시 메인페이지로
    };






  return (
    <div className="auth-button f_flex">
    {isLoggedIn ? (
        <button onClick={handleLogout}>로그아웃</button>
      ) : (
        <>
          {/* 로그인 유지 상태가 아닐 때는 회원가입과 로그인 버튼 */}
          <Link to="/auth">로그인/회원가입</Link>
        </>
      )}
    </div>
  );
};
export default AuthButton;




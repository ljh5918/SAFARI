//npm install react-icons --save
import { IoIosMenu } from "react-icons/io";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../../styles/AuthButton/AuthButton.css';


const AuthButton = ({ scrollToTop }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    setDropdownVisible(false);
  }, [isLoggedIn]);

  const handleLogout = () => {
    // 로그아웃 처리: 로컬 스토리지에서 로그인 상태 제거
    localStorage.removeItem('isLoggedIn');
    navigate("/"); // 로그아웃 시 메인 페이지로
  };

  const GoToMyPage = () => {
    navigate("MyPage");
  }

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="auth-button f_flex">
      {isLoggedIn ? (
        <>
          <div>
            <button onClick={toggleDropdown} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <IoIosMenu size={35} color="black" />
            </button>
          </div>
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <button onClick={GoToMyPage}>마이 페이지</button>
              <button onClick={toggleDropdown}>내 상품</button>
              <button onClick={toggleDropdown}>찜 상품</button>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )}
        </>
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





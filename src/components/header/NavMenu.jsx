








import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../chat/Modal';
import HeaderChat from './headerChat';
import styles from '../../styles/header/Header.module.css';

const NavMenu = ({ scrollToTop }) => {
  const [isChatroomOpen, setChatroomOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Check login status

  const openChatroom = (e) => {
    e.preventDefault(); // Prevent default behavior
    console.log("채팅하기 버튼 클릭됨"); // Debug log
    if (isLoggedIn) {
      setChatroomOpen(true);
    } else {
      // Set flag to open chat after login
      localStorage.setItem('openChatAfterLogin', 'true');
      navigate('/auth');
    }
  };

  const closeChatroom = () => setChatroomOpen(false);

  const handleLogout = () => {
    // Logout handling: remove login status from local storage
    localStorage.removeItem('isLoggedIn');
    navigate("/"); // Navigate to the main page after logout
  };

  useEffect(() => {
    const openChat = localStorage.getItem('openChatAfterLogin');
    if (openChat === 'true') {
      setChatroomOpen(true);
      localStorage.removeItem('openChatAfterLogin');
    }
  }, []);

  return (
    <div className={`${styles.navMenu} ${styles.f_flex}`}>
      <Link to="/sell" onClick={scrollToTop} className={styles.button}>판매하기</Link>
      <a href="#" onClick={openChatroom} className={`${styles.button} ${styles.chatButton}`}>
        채팅하기
      </a>

      {/* Auth buttons integrated here */}
      {isLoggedIn ? (
        <>
          <Link to="/MyPage" className={styles.button}>내상점</Link>
          <a href="#" onClick={handleLogout} className={styles.button}>로그아웃</a>
        </>
      ) : (
        <Link to="/auth" className={styles.button}>로그인/회원가입</Link>
      )}

      <Modal isOpen={isChatroomOpen} onClose={closeChatroom}>
        <HeaderChat />
      </Modal>
    </div>
  );
};

export default NavMenu;

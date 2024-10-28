import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../chat/Modal';
import HeaderChat from './headerChat';
import styles from '../../styles/header/Header.module.css';

const NavMenu = ({ scrollToTop }) => {
  const [isChatroomOpen, setChatroomOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

  const openChatroom = (e) => {
    e.preventDefault(); 
    console.log("채팅하기 버튼 클릭됨"); 
    if (isLoggedIn) {
      setChatroomOpen(true);
    } else {
      localStorage.setItem('openChatAfterLogin', 'true');
      navigate('/auth');
    }
  };

  const closeChatroom = () => setChatroomOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate("/"); 
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

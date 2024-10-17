// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Modal from '../chat/Modal';
// import Chat from '../../pages/MyPage/Chat';
// import styles from '../../styles/header/Header.module.css';

// const NavMenu = ({ scrollToTop }) => {
//   const [isChatroomOpen, setChatroomOpen] = useState(false);

//   const openChatroom = () => setChatroomOpen(true);
//   const closeChatroom = () => setChatroomOpen(false);

//   return (
//     <div className={`${styles.navMenu} ${styles.f_flex}`}>
//       <Link to="/sell" onClick={scrollToTop}>판매하기</Link>
//       <Link onClick={openChatroom}>채팅하기</Link>

//       <Modal isOpen={isChatroomOpen} onClose={closeChatroom}>
//         <Chat />
//       </Modal>
//     </div>
//   );
// };

// export default NavMenu;




// src/components/header/NavMenu.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../chat/Modal';
// import Chat from '../../pages/MyPage/Chat';
import HeaderChat from './headerChat';
import styles from '../../styles/header/Header.module.css';

const NavMenu = ({ scrollToTop }) => {
  const [isChatroomOpen, setChatroomOpen] = useState(false);
  const navigate = useNavigate();

  const openChatroom = (e) => {
    e.preventDefault(); // 기본 동작 방지
    console.log("채팅하기 버튼 클릭됨"); // 디버깅용 로그
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      setChatroomOpen(true);
    } else {
      // 로그인 후 채팅 모달을 열기 위해 플래그 설정
      localStorage.setItem('openChatAfterLogin', 'true');
      navigate('/auth');
    }
  };

  const closeChatroom = () => setChatroomOpen(false);

  useEffect(() => {
    const openChat = localStorage.getItem('openChatAfterLogin');
    if (openChat === 'true') {
      setChatroomOpen(true);
      localStorage.removeItem('openChatAfterLogin');
    }
  }, []);

  return (
    <div className={`${styles.navMenu} ${styles.f_flex}`}>
      <Link to="/sell" onClick={scrollToTop}>판매하기</Link>
      <a href="#" onClick={openChatroom} className={styles.chatButton}>
        채팅하기
      </a>

      <Modal isOpen={isChatroomOpen} onClose={closeChatroom}>
        <HeaderChat />
      </Modal>
    </div>
  );
};

export default NavMenu;

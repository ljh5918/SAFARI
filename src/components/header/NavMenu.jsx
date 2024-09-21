import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../chat/Modal';
import Chat from '../../pages/MyPage/Chat';
import styles from '../../styles/header/Header.module.css';

const NavMenu = ({ scrollToTop }) => {
  const [isChatroomOpen, setChatroomOpen] = useState(false);

  const openChatroom = () => setChatroomOpen(true);
  const closeChatroom = () => setChatroomOpen(false);

  return (
    <div className={`${styles.navMenu} ${styles.f_flex}`}>
      <Link to="/sell" onClick={scrollToTop}>판매하기</Link>
      <Link onClick={openChatroom}>채팅하기</Link>

      <Modal isOpen={isChatroomOpen} onClose={closeChatroom}>
        <Chat />
      </Modal>
    </div>
  );
};

export default NavMenu;



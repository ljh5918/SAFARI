// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Modal from '../chat/Modal';
// import Chatroom from '../chat/Chatroom'
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
//         <Chatroom onClose={closeChatroom} />
//       </Modal>
//     </div>
//   );
// };

// export default NavMenu;




// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Modal from '../chat/Modal';
// import Chat from '../../pages/MyPage/Chat'; // Chat 컴포넌트를 가져옵니다.
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



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../chat/Modal';
import Chat from '../../pages/MyPage/Chat'; // Chat 컴포넌트를 가져옵니다.
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



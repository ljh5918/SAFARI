import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import
import Bar from './Bar'; 
import Sale from './Sale'; 
import Purchase from './Purchase'; 
import Like from './Like'; 
import Products from './Products';
import UserProfile from './UserProfile'; // UserProfile 컴포넌트 import
import styles from '../../styles/MyPage/MyPage.module.css';

// import Chat from './Chat';

const MyPage = () => {
  const [activeSection, setActiveSection] = useState('Products'); // 초기 섹션 설정 변경
  const [userId, setUserId] = useState('홍길동'); // 임시 사용자 이름 설정

  // 사용자가 로그인한 후에 userId를 설정하는 함수
  const handleLogin = (userId) => {
    setUserId(userId);
  };

  // 로그인 시 로컬 스토리지에서 사용자 아이디를 가져옴
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Bar 컴포넌트에서 호출할 함수
  const showSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <div className={styles.myPage}>
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.profilePic}>
            <i className={`${styles.icon} fas fa-store`}></i> {/* 상점 아이콘 */}
          </div>
          <div className={styles.userInfo}>
            {/* 사용자 아이디를 회원정보 수정 버튼 위에 표시 */}
            <div className={styles.userId}>{userId}</div>
            <Link to="/UserProfile" className={styles.editProfileButton}>회원정보 수정</Link> {/* 경로 수정 */}
            <Link to="/Chat" className={styles.chatButton}>채팅</Link> {/* Chat 페이지로 넘어가는 버튼 */}
          </div>
        </div>
      </div>
      <div className={styles.profileButtons}>
        <button className={`${styles.sectionButton} ${activeSection === 'Products' ? styles.active : ''}`} onClick={() => showSection('Products')}>등록한 상품</button>
        <button className={`${styles.sectionButton} ${activeSection === 'Sale' ? styles.active : ''}`} onClick={() => showSection('Sale')}>판매내역</button>
        <button className={`${styles.sectionButton} ${activeSection === 'Purchase' ? styles.active : ''}`} onClick={() => showSection('Purchase')}>구매내역</button>
        <button className={`${styles.sectionButton} ${activeSection === 'Like' ? styles.active : ''}`} onClick={() => showSection('Like')}>찜한 상품</button>
      </div>

      <div className={styles.content}>
        {activeSection === 'Products' && <Products />} 
        {activeSection === 'Sale' && <Sale />} 
        {activeSection === 'Purchase' && <Purchase />} 
        {activeSection === 'Like' && <Like />} 
      </div>
    </div>
  );
};

export default MyPage;

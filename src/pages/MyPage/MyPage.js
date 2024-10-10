import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import
import Bar from './Bar'; 
import Sale from './Sale'; 
import Purchase from './Purchase'; 
import Like from './Like'; 
import Products from './Products';
import UserProfile from './UserProfile'; // UserProfile 컴포넌트 import
import styles from '../../styles/MyPage/MyPage.module.css';

const MyPage = () => {
  const [activeSection, setActiveSection] = useState('Products');
  const [userId, setUserId] = useState(''); // 초기값은 빈 문자열

  // 로그인 시 백엔드 서버에서 닉네임을 가져옴
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/members/myInfo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT 토큰 헤더에 추가
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserId(data.name); 
        } else {
          console.error('Error fetching user info:', response.statusText);
          // 필요 시 사용자에게 에러 메시지 표시
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const showSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <div className={styles.myPage}>
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.profilePic}>
            <i className={`${styles.icon} fas fa-store`}></i>
          </div>
          <div className={styles.userInfo}>
            {/* 백엔드에서 가져온 사용자 아이디(닉네임)를 표시 */}
            <div className={styles.userId}>{userId}</div>
            <Link to="/UserProfile" className={styles.editProfileButton}>회원정보 수정</Link>
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

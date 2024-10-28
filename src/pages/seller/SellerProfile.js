import React, { useState, useEffect } from 'react';
import Products from '../MyPage/MyProducts'
import SellerProduct from './SellerProduct';
import { Link } from 'react-router-dom';
import styles from '../../styles/seller/SellerProfile.module.css';

const SellerProfile = () => {
  const [activeSection, setActiveSection] = useState('Products');
  const [sellerId, setSellerId] = useState('');
  const [userId, setUserId] = useState(''); // 초기값은 빈 문자열

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
    <div className={styles.sellerProfilePage}>
      <div className={styles.profileSection}>
        <div className={styles.profileInfo}>
          <div className={styles.profilePic}>
            <i className={`${styles.icon} fas fa-store`}></i>
          </div>
          <div className={styles.userInfo}>
            {/* <div className={styles.userId}>{sellerId}</div> */}
            <div className={styles.userId}>{userId}</div>
            {/* <Link to="/UserProfile" className={styles.editProfileButton}>
              회원정보 수정
            </Link> */}
          </div>
        </div>
      </div>

      <div className={styles.profileButtons}>
        {/* <button
          className={`${styles.sectionButton} ${activeSection === 'Products' ? styles.active : ''}`}
          onClick={() => showSection('Products')}
        >
          등록한 상품
        </button> */}
       <button className={`${styles.sectionButton} ${activeSection === 'Products' ? styles.active : ''}`} onClick={() => showSection('Products')}>등록한 상품</button>
        <button
          className={`${styles.sectionButton} ${activeSection === 'Reserved' ? styles.active : ''}`}
          onClick={() => showSection('Reserved')}
        >
          예약중
        </button>
        <button
          className={`${styles.sectionButton} ${activeSection === 'Sold' ? styles.active : ''}`}
          onClick={() => showSection('Sold')}
        >
          판매완료
        </button>
      </div>

      <div className={styles.content}>
        {/* {activeSection === 'Products' && <div>등록한 상품 리스트를 여기에 표시합니다.</div>} */}
        {activeSection === 'Products' && <SellerProduct />}
        {activeSection === 'Reserved' && <div>예약중인 상품 리스트를 여기에 표시합니다.</div>}
        {activeSection === 'Sold' && <div>판매완료 상품 리스트를 여기에 표시합니다.</div>}
      </div>
    </div>
  );
};

export default SellerProfile;

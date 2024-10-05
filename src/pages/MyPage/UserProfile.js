import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MyPage/UserProfile.module.css';
import DaumPostcode from 'react-daum-postcode';
import axios from 'axios';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    originalpassword: '', 
    newPassword: '', 
    address: '', 
    streetaddress: '', 
    detailaddress: '',
  });

  const [openPostcode, setOpenPostcode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // JWT token
        const response = await axios.get('http://localhost:8080/members/myInfo', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        // Only set name, email, and address-related fields
        setUserInfo(prev => ({
          ...prev,
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
          streetaddress: response.data.streetaddress,
          detailaddress: response.data.detailaddress,
          originalpassword: '', 
          newPassword: '', 
        }));
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        alert('사용자 정보를 가져오는 데 실패했습니다.'); // Alert user on error
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');

      // 1. 현재 비밀번호 확인
      const checkPasswordResponse = await axios.get('http://localhost:8080/members/checkPwd', {
        params: { checkPassword: userInfo.originalpassword }, // 현재 비밀번호를 params로 보냄
        headers: {
          'Authorization': `Bearer ${token}`, // Include JWT token in header
        },
      });

      if (checkPasswordResponse.data) { // 비밀번호가 맞을 경우
        // 2. 비밀번호 변경 요청
        const response = await axios.put('http://localhost:8080/members/updateForm', {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.newPassword, // 새로운 비밀번호 사용
          zipcode: userInfo.address,
          streetadr: userInfo.streetaddress,
          detailadr: userInfo.detailaddress,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          alert('회원정보가 성공적으로 수정되었습니다.'); // Success message
          navigate('/mypage'); // Redirect to my page
        }
      } else {
        alert('현재 비밀번호가 올바르지 않습니다.'); // 비밀번호 불일치 메시지
      }
    } catch (error) {
      console.error('Failed to update user info:', error);
      if (error.response) {
        if (error.response.status === 401) {
          alert('인증 오류: 로그인 상태를 확인하세요.'); // Alert user on auth error
        } else {
          alert('회원정보 수정에 실패하였습니다.'); // General error message
        }
      } else {
        alert('회원정보 수정에 실패하였습니다.'); // Handle unexpected errors
      }
    }
  };

  const togglePostcode = () => {
    setOpenPostcode((prev) => !prev); 
  };

  const selectAddress = (data) => {
    setUserInfo((prevState) => ({
      ...prevState,
      address: data.zonecode, // Set zipcode
      streetaddress: data.address, // Set street address
      detailaddress: '', // Reset detail address
    }));
    setOpenPostcode(false); // Close postcode popup
  };

  return (
    <div className={styles.userProfile}>
      <h2>회원정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="originalpassword">현재 비밀번호</label>
          <input
            type="password"
            id="originalpassword"
            name="originalpassword"
            value={userInfo.originalpassword}
            onChange={handleChange}
            placeholder="현재 비밀번호를 입력하세요"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={userInfo.newPassword}
            onChange={handleChange}
            placeholder="새 비밀번호를 입력하세요"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">우편번호</label>
          <input
            type="text"
            id="zipcode"
            name="address"
            value={userInfo.address}
            readOnly
          />
          <button type="button" onClick={togglePostcode}>주소 검색</button>
          {openPostcode && (
            <DaumPostcode
              onComplete={selectAddress}
              autoClose={false}
              defaultQuery=""
            />
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="streetaddress">도로명 주소</label>
          <input
            type="text"
            id="streetaddress"
            name="streetaddress"
            value={userInfo.streetaddress}
            readOnly
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="detailaddress">상세 주소</label>
          <input
            type="text"
            id="detailaddress"
            name="detailaddress"
            value={userInfo.detailaddress}
            onChange={handleChange}
            placeholder="상세 주소"
          />
        </div>
        <button type="submit" className={styles.submitButton}>수정하기</button>
      </form>
    </div>
  );
};

export default UserProfile;

import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    email: '',
    nickname: '',
  });

  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [openPostcode, setOpenPostcode] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isNicknameTaken, setIsNicknameTaken] = useState(false);
  const [nicknameAvailabilityMessage, setNicknameAvailabilityMessage] = useState('');
  const [nicknameAvailabilityColor, setNicknameAvailabilityColor] = useState('');
  const [isLoginEnabled, setIsLoginEnabled] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckNickname = () => {
    const existingNicknames = ['nickname1', 'nickname2', 'nickname3'];
    const isTaken = existingNicknames.includes(formData.nickname);
    setIsNicknameTaken(isTaken);
    if (isTaken) {
      setNicknameAvailabilityMessage('이미 사용 중인 닉네임입니다.');
      setNicknameAvailabilityColor('red');
      setIsLoginEnabled(false);
    } else {
      setNicknameAvailabilityMessage('사용 가능한 닉네임입니다.');
      setNicknameAvailabilityColor('blue');
      setIsLoginEnabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 10) {
      setPasswordError('비밀번호는 10자리 이상이어야 합니다.');
      return;
    } else {
      setPasswordError('');
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setConfirmPasswordError('');
    }

    // Store user data in localStorage
    localStorage.setItem('id', formData.id);
    localStorage.setItem('password', formData.password);
    localStorage.setItem('name', formData.name);
    localStorage.setItem('phone', formData.phone);
    localStorage.setItem('email', formData.email);
    localStorage.setItem('nickname', formData.nickname);
    localStorage.setItem('address', address);
    localStorage.setItem('detailAddress', detailAddress);
    console.log(formData);

    navigate('/auth');
  };

  const SelectAddressbtn = () => {
    setOpenPostcode(current => !current);
  }

  const selectAddress = (data) => {
    setAddress(data.address);
    setOpenPostcode(false);
  }

  return (
    <div className={styles.maincontainer}>
      <div className={styles.signupcontainer}>
        <h4>회원정보</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              placeholder="아이디"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="비밀번호 (10자리 이상)"
            />
            {passwordError && <p className={styles.errormessage}>{passwordError}</p>}
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="비밀번호 확인"
            />
            {confirmPasswordError && <p className={styles.errormessage}>{confirmPasswordError}</p>}

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="이름"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="휴대전화 번호 (-)없이 입력하시오"
            />
            <div className={styles.emailcontainer}>
              <input
                type="text"
                maxLength="30"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="이메일 입력"
              />
              <span>@</span>
              <select name="emailDomain" onChange={handleChange}>
                <option value="write">직접 입력</option>
                <option value="naver.com">naver.com</option>
                <option value="google.com">google.com</option>
              </select>
            </div>

            <div className={styles.address}>
              <input
                type="text"
                value={address}
                readOnly
                placeholder="주소"
              />
              <button type="button" onClick={SelectAddressbtn}>주소 검색</button>
            </div>

            {openPostcode && (
              <DaumPostcode
                onComplete={selectAddress}
                autoClose={false}
                defaultQuery=''
              />
            )}

            <input
              type="text"
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="상세 주소"
            />

            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
              placeholder="닉네임"
            />
            <button type="button" onClick={handleCheckNickname}>닉네임 중복 확인</button>
            <p style={{ color: nicknameAvailabilityColor }}>{nicknameAvailabilityMessage}</p>
          </div>
          <button className={styles.signupbtn} type="submit" disabled={!isLoginEnabled}>가입하기</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/Signup.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    zipcode: '',
    streetadr: '',
    detailadr: '',
    role: 'USER',
    mailCode: '',
  });

  const [openPostcode, setOpenPostcode] = useState(false);
  const [isCertified, setIsCertified] = useState(false);
  const [sentCode, setSentCode] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const closePostcode = () => {
    setOpenPostcode(false);
  };

  const renderPostcode = () => {
    if (openPostcode) {
      return (
        <div>
          <DaumPostcode onComplete={selectAddress} />
          <button onClick={closePostcode}>닫기</button>
        </div>
      );
    }
    return null;
  };

    const selectAddress = (data) => {
    setFormData((prevData) => ({
      ...prevData,
      zipcode: data.zonecode,
      streetadr: data.address,
    }));
    setOpenPostcode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(`/mail?mail=${encodeURIComponent(formData.email)}`, null, {
        headers: { "Content-Type": "application/json" },
      });
      setSentCode(response.data);
      alert('인증번호 발송');
    } catch (error) {
      alert(`Error sending code: ${error.response ? error.response.data : error.message}`);
    }
  };

  const handleConfirmCode = () => {
    if (formData.mailCode === String(sentCode)) {
      alert('인증 성공');
      setIsCertified(true);
    } else {
      alert('인증번호 불일치');
      setIsCertified(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCertified) {
      alert('메일 인증을 진행해야합니다!');
      return;
    }

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

    try {
      const response = await axios.post(
        '/members/new',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          zipcode: formData.zipcode,
          streetadr: formData.streetadr,
          detailadr: formData.detailadr,
          role: formData.role,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log('가입성공', response.data);
      // response는 Axios의 POST 요청이 성공적으로 실행된 후에 서버에서 반환되는 응답을 가리킵니다. 
      //membercontriller.java 에 회원가입 postmapping에 return member/memberform 의 데이터가 나옴
      navigate('/auth'); 
    } catch (error) {
      alert(`회원가입에 실패했습니다. 다시 시도해주세요: ${error.response ? error.response.data : error.message}`);
    }
  };



  return (
      <form onSubmit={handleSubmit} method="POST">
        <div className={styles.maincontainer}>
          <div className={styles.signupcontainer}>
            <h4>회원정보</h4>
            <div className={styles.formgroup}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="이름을 입력하세요"
              />
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="이메일을 입력하세요"
              />
              <button type="button" onClick={handleSendEmail}>인증번호 전송</button>
              <input
                type="text"
                name="mailCode"
                value={formData.mailCode}
                onChange={handleChange}
                placeholder="인증번호 입력"
              />
              <button type="button" onClick={handleConfirmCode}>이메일 인증</button>
              <span>{isCertified ? '인증 완료' : '인증 실패'}</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="비밀번호 (10자리 이상)"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="비밀번호 재입력"
              />
              <span className={styles.error}>{passwordError}</span>
              <span className={styles.error}>{confirmPasswordError}</span>
            </div>
    
            <div className={styles.formgroup}>
              <button type="button" onClick={() => setOpenPostcode(!openPostcode)}>주소 찾기</button>
              {renderPostcode()}
              <input
                type="text"
                name="zipcode"
                value={formData.zipcode}
                readOnly
                placeholder="우편번호"
              />
              <input
                type="text"
                name="streetadr"
                value={formData.streetadr}
                readOnly
                placeholder="도로명 주소"
              />
              <input
                type="text"
                name="detailadr"
                value={formData.detailadr}
                onChange={handleChange}
                placeholder="상세 주소"
              />
            </div>
    
            <button type="submit">가입</button>
          </div>
        </div>
      </form>
    );
    
};

export default Signup;

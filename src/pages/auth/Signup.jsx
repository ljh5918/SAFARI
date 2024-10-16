// // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // import DaumPostcode from 'react-daum-postcode';
// // // // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // import styles from '../../styles/Signup.module.css';

// // // // // // // // // // // // // const Signup = () => {
// // // // // // // // // // // // //   const [formData, setFormData] = useState({
// // // // // // // // // // // // //     id: '',
// // // // // // // // // // // // //     password: '',
// // // // // // // // // // // // //     confirmPassword: '',
// // // // // // // // // // // // //     name: '',
// // // // // // // // // // // // //     phone: '',
// // // // // // // // // // // // //     email: '',
// // // // // // // // // // // // //     nickname: '',
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   const [address, setAddress] = useState('');
// // // // // // // // // // // // //   const [detailAddress, setDetailAddress] = useState('');
// // // // // // // // // // // // //   const [openPostcode, setOpenPostcode] = useState(false);

// // // // // // // // // // // // //   const [passwordError, setPasswordError] = useState('');
// // // // // // // // // // // // //   const [confirmPasswordError, setConfirmPasswordError] = useState('');
// // // // // // // // // // // // //   const [isNicknameTaken, setIsNicknameTaken] = useState(false);
// // // // // // // // // // // // //   const [nicknameAvailabilityMessage, setNicknameAvailabilityMessage] = useState('');
// // // // // // // // // // // // //   const [nicknameAvailabilityColor, setNicknameAvailabilityColor] = useState('');
// // // // // // // // // // // // //   const [isLoginEnabled, setIsLoginEnabled] = useState(false);
// // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // //   const handleChange = (e) => {
// // // // // // // // // // // // //     const { name, value } = e.target;
// // // // // // // // // // // // //     setFormData({
// // // // // // // // // // // // //       ...formData,
// // // // // // // // // // // // //       [name]: value
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleCheckNickname = () => {
// // // // // // // // // // // // //     const existingNicknames = ['nickname1', 'nickname2', 'nickname3'];
// // // // // // // // // // // // //     const isTaken = existingNicknames.includes(formData.nickname);
// // // // // // // // // // // // //     setIsNicknameTaken(isTaken);
// // // // // // // // // // // // //     if (isTaken) {
// // // // // // // // // // // // //       setNicknameAvailabilityMessage('이미 사용 중인 닉네임입니다.');
// // // // // // // // // // // // //       setNicknameAvailabilityColor('red');
// // // // // // // // // // // // //       setIsLoginEnabled(false);
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       setNicknameAvailabilityMessage('사용 가능한 닉네임입니다.');
// // // // // // // // // // // // //       setNicknameAvailabilityColor('blue');
// // // // // // // // // // // // //       setIsLoginEnabled(true);
// // // // // // // // // // // // //     }
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const handleSubmit = (e) => {
// // // // // // // // // // // // //     e.preventDefault();

// // // // // // // // // // // // //     if (formData.password.length < 10) {
// // // // // // // // // // // // //       setPasswordError('비밀번호는 10자리 이상이어야 합니다.');
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       setPasswordError('');
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     if (formData.password !== formData.confirmPassword) {
// // // // // // // // // // // // //       setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
// // // // // // // // // // // // //       return;
// // // // // // // // // // // // //     } else {
// // // // // // // // // // // // //       setConfirmPasswordError('');
// // // // // // // // // // // // //     }

// // // // // // // // // // // // //     // Store user data in localStorage
// // // // // // // // // // // // //     localStorage.setItem('id', formData.id);
// // // // // // // // // // // // //     localStorage.setItem('password', formData.password);
// // // // // // // // // // // // //     localStorage.setItem('name', formData.name);
// // // // // // // // // // // // //     localStorage.setItem('phone', formData.phone);
// // // // // // // // // // // // //     localStorage.setItem('email', formData.email);
// // // // // // // // // // // // //     localStorage.setItem('nickname', formData.nickname);
// // // // // // // // // // // // //     localStorage.setItem('address', address);
// // // // // // // // // // // // //     localStorage.setItem('detailAddress', detailAddress);
// // // // // // // // // // // // //     console.log(formData);

// // // // // // // // // // // // //     navigate('/auth');
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const SelectAddressbtn = () => {
// // // // // // // // // // // // //     setOpenPostcode(current => !current);
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   const selectAddress = (data) => {
// // // // // // // // // // // // //     setAddress(data.address);
// // // // // // // // // // // // //     setOpenPostcode(false);
// // // // // // // // // // // // //   }

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className={styles.maincontainer}>
// // // // // // // // // // // // //       <div className={styles.signupcontainer}>
// // // // // // // // // // // // //         <h4>회원정보</h4>
// // // // // // // // // // // // //         <form onSubmit={handleSubmit}>
// // // // // // // // // // // // //           <div className={styles.formgroup}>
// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // //               name="id"
// // // // // // // // // // // // //               value={formData.id}
// // // // // // // // // // // // //               onChange={handleChange}
// // // // // // // // // // // // //               required
// // // // // // // // // // // // //               placeholder="아이디"
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               type="password"
// // // // // // // // // // // // //               name="password"
// // // // // // // // // // // // //               value={formData.password}
// // // // // // // // // // // // //               onChange={handleChange}
// // // // // // // // // // // // //               required
// // // // // // // // // // // // //               placeholder="비밀번호 (10자리 이상)"
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             {passwordError && <p className={styles.errormessage}>{passwordError}</p>}
// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               type="password"
// // // // // // // // // // // // //               name="confirmPassword"
// // // // // // // // // // // // //               value={formData.confirmPassword}
// // // // // // // // // // // // //               onChange={handleChange}
// // // // // // // // // // // // //               required
// // // // // // // // // // // // //               placeholder="비밀번호 확인"
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             {confirmPasswordError && <p className={styles.errormessage}>{confirmPasswordError}</p>}

// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // //               name="name"
// // // // // // // // // // // // //               value={formData.name}
// // // // // // // // // // // // //               onChange={handleChange}
// // // // // // // // // // // // //               required
// // // // // // // // // // // // //               placeholder="이름"
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               type="tel"
// // // // // // // // // // // // //               name="phone"
// // // // // // // // // // // // //               value={formData.phone}
// // // // // // // // // // // // //               onChange={handleChange}
// // // // // // // // // // // // //               required
// // // // // // // // // // // // //               placeholder="휴대전화 번호 (-)없이 입력하시오"
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             <div className={styles.emailcontainer}>
// // // // // // // // // // // // //               <input
// // // // // // // // // // // // //                 type="text"
// // // // // // // // // // // // //                 maxLength="30"
// // // // // // // // // // // // //                 name="email"
// // // // // // // // // // // // //                 value={formData.email}
// // // // // // // // // // // // //                 onChange={handleChange}
// // // // // // // // // // // // //                 required
// // // // // // // // // // // // //                 placeholder="이메일 입력"
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //               <span>@</span>
// // // // // // // // // // // // //               <select name="emailDomain" onChange={handleChange}>
// // // // // // // // // // // // //                 <option value="write">직접 입력</option>
// // // // // // // // // // // // //                 <option value="naver.com">naver.com</option>
// // // // // // // // // // // // //                 <option value="google.com">google.com</option>
// // // // // // // // // // // // //               </select>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             <div className={styles.address}>
// // // // // // // // // // // // //               <input
// // // // // // // // // // // // //                 type="text"
// // // // // // // // // // // // //                 value={address}
// // // // // // // // // // // // //                 readOnly
// // // // // // // // // // // // //                 placeholder="주소"
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //               <button type="button" onClick={SelectAddressbtn}>주소 검색</button>
// // // // // // // // // // // // //             </div>

// // // // // // // // // // // // //             {openPostcode && (
// // // // // // // // // // // // //               <DaumPostcode
// // // // // // // // // // // // //                 onComplete={selectAddress}
// // // // // // // // // // // // //                 autoClose={false}
// // // // // // // // // // // // //                 defaultQuery=''
// // // // // // // // // // // // //               />
// // // // // // // // // // // // //             )}

// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // //               value={detailAddress}
// // // // // // // // // // // // //               onChange={(e) => setDetailAddress(e.target.value)}
// // // // // // // // // // // // //               placeholder="상세 주소"
// // // // // // // // // // // // //             />

// // // // // // // // // // // // //             <input
// // // // // // // // // // // // //               type="text"
// // // // // // // // // // // // //               name="nickname"
// // // // // // // // // // // // //               value={formData.nickname}
// // // // // // // // // // // // //               onChange={handleChange}
// // // // // // // // // // // // //               required
// // // // // // // // // // // // //               placeholder="닉네임"
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             <button type="button" onClick={handleCheckNickname}>닉네임 중복 확인</button>
// // // // // // // // // // // // //             <p style={{ color: nicknameAvailabilityColor }}>{nicknameAvailabilityMessage}</p>
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //           <button className={styles.signupbtn} type="submit" disabled={!isLoginEnabled}>가입하기</button>
// // // // // // // // // // // // //         </form>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default Signup;












import React, { useState, useEffect } from 'react';
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
    console.log(`Updated ${name}: ${value}`);
  };

  const handleSendEmail = async () => {
    try {
      const response = await axios.post(`/mail?mail=${encodeURIComponent(formData.email)}`, null, {
      // const response = await axios.post(`/mail`, formData.email, {
        headers: { "Content-Type": "application/json" },
      });
      setSentCode(response.data);
      console.log(response.data);
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
  
    try {
      console.log("전송할 데이터: ", formData);
  
      const response = await axios.post(
        'http://localhost:8080/members/new',
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
          headers: {
            "Content-Type": "application/json",
            
          },
        }
      );
  
      console.log('가입 성공', response.data);
      navigate('/auth'); // 가입 성공 후 리다이렉트
    } catch (error) {
      alert(`회원가입에 실패했습니다. 다시 시도해주세요: ${error.response ? error.response.data : error.message}`);
    }
  };
  return (
    <div className={styles.maincontainer}>
      <div className={styles.signupcontainer}>
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  );
};

export default Signup;


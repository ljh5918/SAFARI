import React, { useState } from 'react';
import DaumPostcode from "react-daum-postcode"; //주소 입력 api
import { useNavigate } from "react-router-dom";
import styles from "../Signup/Signup.module.css";
// import './Signup.css';




const Signup = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name : '',
    nickname: '',
  });

  
  // 우편 번호 검색 기능
  const [address, setAddress] = useState(""); // 우편번호
  const [detailaddress, setDetailaddress] = useState(""); //api상의 주소
  const [detail2address, setDetail2address] = useState(""); //상세주소
  // const {addDocument, response } = useFirestore('manmul');
  const [openPostcode, setOpenPostcode] = useState(false); //다음주소api
  
  const SelectAddressbtn =() =>{
    setOpenPostcode(current => !current);
}

const selectAddress = (data) => {
    console.log(`
            주소: ${data.address},
            우편번호: ${data.zonecode}
        `)
        setAddress(data.zonecode);
        setDetailaddress(data.address);
        setOpenPostcode(false);
}






  const [passwordError, setPasswordError] = useState(''); // 비밀번호
  const [confirmPasswordError, setConfirmPasswordError] = useState(''); //비밀번호 확인
  const [isNicknameTaken, setIsNicknameTaken] = useState(false); // 닉네임 중복 여부 상태 추가
  const [nicknameAvailabilityMessage, setNicknameAvailabilityMessage] = useState(''); // 닉네임 중복 메시지 상태 추가
  const [nicknameAvailabilityColor, setNicknameAvailabilityColor] = useState(''); // 닉네임 중복 메시지 color 상태 추가
  const [isLoginEnabled, setIsLoginEnabled] = useState(false); // 가입하기 버튼 활성화 여부 상태 추가
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleCheckNickname = () => {
    const existingNicknames = ['nickname1', 'nickname2', 'nickname3']; // 기존에 사용된 닉네임 목록
    const isTaken = existingNicknames.includes(formData.nickname);
    setIsNicknameTaken(isTaken);
    if (isTaken) {
      setNicknameAvailabilityMessage('이미 사용 중인 닉네임입니다.');
      setNicknameAvailabilityColor('red');
      setIsLoginEnabled(false); // 닉네임이 이미 사용 중일 때 가입하기 버튼 비활성화
    } else {
      setNicknameAvailabilityMessage('사용 가능한 닉네임입니다.');
      setNicknameAvailabilityColor('blue');
      setIsLoginEnabled(true); // 닉네임이 사용 가능할 때 가입하기 버튼 활성화
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

    // 여기에 회원가입 로직을 추가할 수 있습니다.
    console.log(formData);
    navigate('/Login'); // 회원가입 성공 시 로그인 페이지로 이동
  };

  return (
    <div className={styles.maincontainer}>
    <h1 className={styles.title}>SAFARI</h1>
    <div className={styles.signupcontainer}>
      <h4>회원정보</h4>
      
      <form className ='abc'onSubmit={handleSubmit}>
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
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
          placeholder='이름'/>


         {/* <input
         type="text"
         name='birthday'
         value={formData.birthday}
         onChange={handleChange}
         required
         placeholder='생년월일 예)19990101'
          /> */}

        <input 
        type="tel"
        name='phon'
        value={formData.phon}
        onChange={handleChange}
        required
        placeholder='휴대전화 번호 (-)없이 입력하시오'
         />
         
        <div className={styles.emailcontainer}> 
        <input 
        type="text"
        maxLength='30'
        name='email'
        value={formData.email}
        onChange={handleChange}
        required
        placeholder='이메일 입력'
        />
        <span>@</span>
        <select className='' onChange={handleChange}>
          <option value="write">직접 입력</option>
          <option value="naver.com">naver.com</option>
          <option value="google.com">google.com</option>   
        </select>
        </div>

          
        {/* Daum-postcode */}
        {/* react에서 제공하는 daum-post-code  */}
        {/* 우편번호 api활용하여 회원가입의 주소 입력 해결 */}
        {/* npm install react-daum-postcode or yarn add react-daum-post code  설치 */}
        {/* 1. api를 실행할 컴포넌트
            2. 주소에 넣어줄 text와 팝업에 띄울 button
            3. 필요한 event handler
        */}
        
        <div className={styles.address}>
        <input
          type='text'
          value={detailaddress}/>
        <button  
          // className="address_daum"
          onClick={SelectAddressbtn}
          value={address}>주소 검색</button>
        </div>

                
          {openPostcode &&
           <DaumPostcode
            onComplete={selectAddress}  // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery='' // 팝업을 열때 기본적으로 입력되는 검색어
            placeholder ='예) 판교역로 166, 분당 주공, 백현동 532'
            />}
           
            {/* <td className="title" placeholder='상세 주소'></td> */}

            
             
                
            <input
             type='text'
             value={detail2address}
             onChange={(e)=>{ setDetail2address(e.target.value)}}
             placeholder='상세 주소'
            />
           


          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            required
            placeholder="닉네임"
          />
          <button type='button' onClick={handleCheckNickname}>닉네임 중복 확인</button>
          <p className='' style={{color : nicknameAvailabilityColor}}>{nicknameAvailabilityMessage}</p>
        </div>
        <button type="submit" disabled={!isLoginEnabled}>가입하기</button>
      </form>
    </div>
    </div>
  );
};






export default Signup;

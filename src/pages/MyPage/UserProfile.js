



    // import React, { useState, useEffect } from 'react';
    // import { useNavigate } from 'react-router-dom';
    // import styles from '../../styles/MyPage/UserProfile.module.css';
    // import DaumPostcode from 'react-daum-postcode';

    // const UserProfile = () => {
    // const [userInfo, setUserInfo] = useState({
    //     id: '',
    //     password: '',
    //     name: '',
    //     phone: '',
    //     email: '',
    //     nickname: '',
    //     address: '',
    //     detailAddress: ''
    // });

    // const [openPostcode, setOpenPostcode] = useState(false);
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUserId = localStorage.getItem('id');
    //     const storedPassword = localStorage.getItem('password');
    //     const storedName = localStorage.getItem('name');
    //     const storedPhone = localStorage.getItem('phone');
    //     const storedEmail = localStorage.getItem('email');
    //     const storedNickname = localStorage.getItem('nickname');
    //     const storedAddress = localStorage.getItem('address');
    //     const storedDetailAddress = localStorage.getItem('detailAddress');

    //     setUserInfo({
    //     id: storedUserId || '',
    //     password: storedPassword || '',
    //     name: storedName || '',
    //     phone: storedPhone || '',
    //     email: storedEmail || '',
    //     nickname: storedNickname || '',
    //     address: storedAddress || '',
    //     detailAddress: storedDetailAddress || ''
    //     });
    // }, []);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setUserInfo(prevState => ({
    //     ...prevState,
    //     [name]: value
    //     }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     localStorage.setItem('id', userInfo.id);
    //     localStorage.setItem('password', userInfo.password);
    //     localStorage.setItem('name', userInfo.name);
    //     localStorage.setItem('phone', userInfo.phone);
    //     localStorage.setItem('email', userInfo.email);
    //     localStorage.setItem('nickname', userInfo.nickname);
    //     localStorage.setItem('address', userInfo.address);
    //     localStorage.setItem('detailAddress', userInfo.detailAddress);
    //     alert('회원정보가 성공적으로 수정되었습니다.');

    //     // Redirect to mypage
    //     navigate('/mypage');
    // };

    // const SelectAddressbtn = () => {
    //     setOpenPostcode(current => !current);
    // }

    // const selectAddress = (data) => {
    //     setUserInfo(prevState => ({
    //     ...prevState,
    //     address: data.address,
    //     detailAddress: ''
    //     }));
    //     setOpenPostcode(false);
    // }

    // return (
    //     <div className={styles.userProfile}>
    //     <h2>회원정보 수정</h2>
    //     <form onSubmit={handleSubmit}>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="id">아이디</label>
    //         <input type="text" id="id" name="id" value={userInfo.id} onChange={handleChange} disabled />
    //         </div>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="password">비밀번호</label>
    //         <input type="password" id="password" name="password" value={userInfo.password} onChange={handleChange} />
    //         </div>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="name">이름</label>
    //         <input type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} />
    //         </div>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="phone">휴대전화 번호</label>
    //         <input type="tel" id="phone" name="phone" value={userInfo.phone} onChange={handleChange} />
    //         </div>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="email">이메일</label>
    //         <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} />
    //         </div>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="nickname">닉네임</label>
    //         <input type="text" id="nickname" name="nickname" value={userInfo.nickname} onChange={handleChange} />
    //         </div>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="address">주소</label>
    //         <input
    //             type="text"
    //             id="address"
    //             name="address"
    //             value={userInfo.address}
    //             onChange={handleChange}
    //             readOnly
    //         />
    //         <button type="button" onClick={SelectAddressbtn}>주소 검색</button>
    //         {openPostcode && (
    //             <DaumPostcode
    //             onComplete={selectAddress}
    //             autoClose={false}
    //             defaultQuery=''
    //             />
    //         )}
    //         </div>
    //         <div className={styles.formGroup}>
    //         <label htmlFor="detailAddress">상세 주소</label>
    //         <input
    //             type="text"
    //             id="detailAddress"
    //             name="detailAddress"
    //             value={userInfo.detailAddress}
    //             onChange={handleChange}
    //             placeholder="상세 주소"
    //         />
    //         </div>
    //         <button type="submit" className={styles.submitButton}>수정하기</button>
    //     </form>
    //     </div>
    // );
    // };

    // export default UserProfile;














    import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/MyPage/UserProfile.module.css';
import DaumPostcode from 'react-daum-postcode';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
    name: '',
    phone: '',
    email: '',
    nickname: '',
    address: '',
    detailAddress: ''
  });

  const [openPostcode, setOpenPostcode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    const storedPassword = localStorage.getItem('password');
    const storedName = localStorage.getItem('name');
    const storedPhone = localStorage.getItem('phone');
    const storedEmail = localStorage.getItem('email');
    const storedNickname = localStorage.getItem('nickname');
    const storedAddress = localStorage.getItem('address');
    const storedDetailAddress = localStorage.getItem('detailAddress');

    setUserInfo({
      id: storedUserId || '',
      password: storedPassword || '',
      name: storedName || '',
      phone: storedPhone || '',
      email: storedEmail || '',
      nickname: storedNickname || '',
      address: storedAddress || '',
      detailAddress: storedDetailAddress || ''
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('id', userInfo.id);
    localStorage.setItem('password', userInfo.password);
    localStorage.setItem('name', userInfo.name);
    localStorage.setItem('phone', userInfo.phone);
    localStorage.setItem('email', userInfo.email);
    localStorage.setItem('nickname', userInfo.nickname);
    localStorage.setItem('address', userInfo.address);
    localStorage.setItem('detailAddress', userInfo.detailAddress);
    alert('회원정보가 성공적으로 수정되었습니다.');

    // Redirect to mypage
    navigate('/mypage');
  };

  const SelectAddressbtn = () => {
    setOpenPostcode(current => !current);
  }

  const selectAddress = (data) => {
    setUserInfo(prevState => ({
      ...prevState,
      address: data.address,
      detailAddress: ''
    }));
    setOpenPostcode(false);
  }

  return (
    <div className={styles.userProfile}>
      <h2>회원정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" name="id" value={userInfo.id} onChange={handleChange} disabled />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">비밀번호</label>
          <input type="password" id="password" name="password" value={userInfo.password} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">이름</label>
          <input type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone">휴대전화 번호</label>
          <input type="tel" id="phone" name="phone" value={userInfo.phone} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="nickname">닉네임</label>
          <input type="text" id="nickname" name="nickname" value={userInfo.nickname} onChange={handleChange} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address">주소</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            readOnly
          />
          <button type="button" onClick={SelectAddressbtn}>주소 검색</button>
          {openPostcode && (
            <DaumPostcode
              onComplete={selectAddress}
              autoClose={false}
              defaultQuery=''
            />
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="detailAddress">상세 주소</label>
          <input
            type="text"
            id="detailAddress"
            name="detailAddress"
            value={userInfo.detailAddress}
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

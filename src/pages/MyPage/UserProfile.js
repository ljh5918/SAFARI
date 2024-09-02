import React, { useState, useEffect } from 'react';
import styles from '../../styles/MyPage/UserProfile.module.css';

const UserProfile = () => {
    // 각 사용자 정보를 담을 상태
    const [userInfo, setUserInfo] = useState({
        id: '',
        password: '',
        name: '',
        phoneNumber: '',
        email: '',
        nickname: ''
    });

    // 컴포넌트가 마운트될 때 사용자 정보를 가져오는 함수
    useEffect(() => {
        // 서버에서 사용자 정보를 가져와서 상태에 설정하는 코드 작성
        // 임시 데이터로 대체
        const tempUserInfo = {
            id: 'min',
            password: 'min0816',
            name: '박민서',
            phoneNumber: '010-1234-5678',
            email: 'abc@vv.com',
            nickname: '닉네임'
        };
        setUserInfo(tempUserInfo);
    }, []);

    // 폼 입력값이 변경될 때마다 상태 업데이트
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 폼 제출 시 실행되는 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        // 수정된 사용자 정보를 서버로 전송하는 코드 
        console.log(userInfo); // 임시로 수정된 정보 콘솔에 출력
        // 서버에 수정된 사용자 정보를 전송하는 코드 
    };

    return (
        <div className={styles.userProfile}>
            <h2>회원정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="id">아이디 </label>
                    <input type="text" id="id" name="id" value={userInfo.id} onChange={handleChange} disabled />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">비밀번호 </label>
                    <input type="string" id="password" name="password" value={userInfo.password} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" name="name" value={userInfo.name} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber">전화번호</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={userInfo.phoneNumber} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email">이메일</label>
                    <input type="email" id="email" name="email" value={userInfo.email} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="nickname">닉네임</label>
                    <input type="text" id="nickname" name="nickname" value={userInfo.nickname} onChange={handleChange} />
                </div>
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default UserProfile;

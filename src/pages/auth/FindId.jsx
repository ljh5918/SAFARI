import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Login.module.css';

const FindId = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/members/findId', {
        memberEmail: email
      });

      if (response.status === 200) {
        setMessage(`아이디는: ${response.data}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setMessage('이메일이 등록되어 있지 않습니다.'); // Email not found
      } else {
        setMessage('아이디 찾기에 실패했습니다. 다시 시도해주세요.'); // General error
      }
    }
  };

  return (
    <div className={styles.findIdContainer}>
      <h3>아이디 찾기</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
          required
        />
        <button type="submit">아이디 찾기</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={() => navigate('/login')}>돌아가기</button> {/* Redirect to login */}
    </div>
  );
};

export default FindId;

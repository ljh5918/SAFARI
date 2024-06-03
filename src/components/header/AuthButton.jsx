import React from 'react';
import { Link } from 'react-router-dom';

const AuthButton = ({ scrollToTop }) => {
  return (
    <div className="auth-button f_flex">
      {/* <Link to="/auth" onClick={scrollToTop}>로그인/회원가입</Link> */}
      <Link to="/auth">로그인/회원가입</Link>
    </div>
  );
};

export default AuthButton;
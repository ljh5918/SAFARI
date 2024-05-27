import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo/SAFARI.png";

const Logo = ({ scrollToTop }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    scrollToTop();
    navigate('/');
  };

  return (
    <div className="logo" onClick={handleClick}>
      <img src={logo} alt="SAFARI logo" />
    </div>
  );
};

export default Logo;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo/SAFARI.png";
import styles from '../../styles/header/Header.module.css';

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate('/');
  };

  return (
    <div className={styles.logo} onClick={handleClick}>
      <img src={logo} alt="SAFARI logo" />
    </div>
  );
};

export default Logo;

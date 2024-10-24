import React, { useState } from 'react';
import styles from '../../styles/header/Header.module.css';
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import AuthButton from './AuthButton';
// import Category from './Category';

const Header = () => {
  const [showCategories, setShowCategories] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.container} ${styles.d_flex}`}>
        <Logo scrollToTop={scrollToTop} />
       
        <SearchBar scrollToTop={scrollToTop}/>
        <NavMenu scrollToTop={scrollToTop} />
        <AuthButton scrollToTop={scrollToTop} />
      </div>
      {/* <div className={styles.categoryContainer}>
        <Category showCategories={showCategories} setShowCategories={setShowCategories} />
      </div> */}
    </header>
  );
};

export default Header;
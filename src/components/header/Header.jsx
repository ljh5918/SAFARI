import React from 'react';
import "../../styles/header/Header.css";
import Logo from './Logo';
import SearchBar from './SearchBar';
import NavMenu from './NavMenu';
import AuthButton from './AuthButton';

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header className="header">
      <div className="container d_flex">
        <Logo scrollToTop={scrollToTop} />
        <SearchBar />
        <NavMenu scrollToTop={scrollToTop} />
        <AuthButton scrollToTop={scrollToTop} />
      </div>
    </header>
  );
};

export default Header;
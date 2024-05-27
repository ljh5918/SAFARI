import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = ({ scrollToTop }) => {
  return (
    <div className="nav-menu f_flex">
      <Link to="/free-share" onClick={scrollToTop}>무료나눔</Link>
      <Link to="/sell" onClick={scrollToTop}>판매하기</Link>
      <Link to="/chat" onClick={scrollToTop}>채팅하기</Link>
    </div>
  );
};

export default NavMenu;

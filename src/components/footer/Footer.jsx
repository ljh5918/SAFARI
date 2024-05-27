import React from "react";
import "../../styles/footer/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-box">
            <h1>SAFARI</h1>
            <p>
              안전거래해조
            </p>
          </div>
          <div className="footer-box">
            <h2>Joongbu University</h2>
            <ul>
              <li>주소 10279 경기도 고양시 덕양구 동헌로 305</li>
              <li>메일 2jm99@naver.com</li>
              <li>연락처 +82 010 7767 5466</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SAFARI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import styles from "../../styles/footer/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBox}>
            <h1 className={styles.footerTitle}>SAFARI</h1>
            <p>안전거래해조</p>
          </div>
          <div className={styles.footerBox}>
            <h2 className={styles.footerSubtitle}>Joongbu University</h2>
            <ul>
              <li>주소 10279 경기도 고양시 덕양구 동헌로 305</li>
              <li>메일 2jm99@naver.com</li>
              <li>연락처 +82 010 7767 5466</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 SAFARI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

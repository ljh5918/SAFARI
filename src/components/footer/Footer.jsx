import React from "react";
import styles from "../../styles/footer/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.section}>
            <h1 className={styles.title}>SAFARI</h1>
            <p className={styles.description}>안전거래해조</p>
          </div>
          <div className={styles.section}>
            <h2 className={styles.subtitle}>Joongbu University</h2>
            <ul className={styles.list}>
              <li className={styles.item}>주소: 10279 경기도 고양시 덕양구 동헌로 305</li>
              <li className={styles.item}>이메일: 2jm99@naver.com</li>
              <li className={styles.item}>전화: +82 010 7767 5466</li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>&copy; 2024 SAFARI.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

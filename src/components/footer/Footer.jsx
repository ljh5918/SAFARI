// footer.jsx

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "../../styles/footer/Footer.module.css";

const teamMembers = [
  {
    id: 1,
    name: "이종민",
    role: "프론트엔드",
    //sns: "https://www.instagram.com/",
    github: "https://github.com/2222jongmin",
  },
  {
    id: 2,
    name: "이재혁",
    role: "프론트엔드",
    sns: "https://www.instagram.com/2.jaehk",
    github: "https://github.com/ljh5918",
  },
  {
    id: 3,
    name: "박민서",
    role: "프론트엔드",
    sns: "https://www.instagram.com/",
    github: "https://github.com/minseodao",
  },
  {
    id: 4,
    name: "정범규",
    role: "백엔드",
    sns: "https://www.instagram.com/",
    github: "https://github.com/jeongbeomgyu",
  },
  {
    id: 5,
    name: "박정수",
    role: "백엔드",
    sns: "https://www.instagram.com/",
    github: "https://github.com/",
  },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.section}>
            <h2 className={styles.subtitle}>사파리</h2>
            <ul className={styles.list}>
              <li className={styles.item}>Joongbu University 정보보호학전공</li>
              <li className={styles.item}>주소: 10279 경기도 고양시 덕양구 동헌로 305</li>
              <li className={styles.item}>이메일: 2jm99@naver.com</li>
            </ul>
          </div>
          <div className={styles.section}>
            <h2 className={styles.subtitle}>안전거래해조</h2>
            <ul className={styles.list}>
              {teamMembers.map((member) => (
                <li key={member.id} className={styles.item}>
                  {member.name} - {member.role}
                  <a href={member.sns} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                    <FontAwesomeIcon icon={faInstagram} className={styles.icon} />
                  </a>
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className={styles.iconLink}>
                    <FontAwesomeIcon icon={faGithub} className={styles.icon} />
                  </a>
                </li>
              ))}
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



import React, { useEffect } from "react";
import styles from "../../styles/home/Home.module.css";
import homeimg from "../../assets/homeimg.png";

const Home = () => {
  useEffect(() => {
    console.log("Home component rendered");
  }, []);

  const bannerData = {
    title: "사고 파는 우리!",
    desc: (
      <>
        원하는 중고, <span style={{ color: "#ff5757" }}>사파리</span>에서 쉽고 빠르게
      </>
    ),
    cover: homeimg,
  };

  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <section className={styles.homeBanner}>
          <div className={styles.bannerWrapper}>
            <div className={styles.left}>
              <img src={bannerData.cover} alt="사파리 중고거래 플랫폼 소개 이미지" />
            </div>
            <div className={styles.right}>
              <h1>{bannerData.title}</h1>
              <p>{bannerData.desc}</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;

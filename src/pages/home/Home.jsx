import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../styles/home/Home.module.css";

const Home = () => {
  useEffect(() => {
    console.log('Home component rendered');
  }, []);

  const sliderData = [
    {
      id: 1,
      title: "사고 파는 우리! 사파리",
      desc: "시리얼 넘버 기반 중고거래",
      //cover: require("../../assets/slide-1.png"),
    },
    {
      id: 2,
      title: "사고 파는 우리! 사파리",
      desc: "시리얼 넘버 기반 중고거래",
      //cover: require("../../assets/slide-2.png"),
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => <ul style={{ margin: "0px" }}>{dots}</ul>,
    arrows: false,
  };

  return (
    <section className={styles.home}>
      <div className={styles.container}>
        <section className={`${styles.homeSlide} contentWidth`}>
          <div className={styles.sliderWrapper}>
            <Slider {...settings}>
              {sliderData.map((value, index) => (
                <div className={`${styles.box} ${styles.top}`} key={index}>
                  <div className={styles.left}>
                    <h1>{value.title}</h1>
                    <p>{value.desc}</p>
                  </div>
                  <div className={styles.right}>
                    <img src={value.cover} alt="" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;

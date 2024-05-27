import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/home/Home.css";
import Category from "../../components/category/Category";

const Home = () => {
  const sliderData = [
    {
      id: 1,
      title: "사고 파는 우리! 사파리",
      desc: "시리얼 넘버 기반 중고거래",
      cover: "../../assets/slide-1.png",
    },
    {
      id: 2,
      title: "사고 파는 우리! 사파리",
      desc: "시리얼 넘버 기반 중고거래",
      cover: "./images/SlideCard/slide-2.png",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    appendDots: (dots) => <ul style={{ margin: "0px" }}>{dots}</ul>,
  };

  return (
    <section className="home">
      <div className="container d_flex">
        <Category />
        <section className="homeSlide contentWidth">
          <div className="container">
            <Slider {...settings}>
              {sliderData.map((value, index) => (
                <div className="box d_flex top" key={index}>
                  <div className="left">
                    <h1>{value.title}</h1>
                    <p>{value.desc}</p>
                    <button className="btn-primary">더 알아보기</button>
                  </div>
                  <div className="right">
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
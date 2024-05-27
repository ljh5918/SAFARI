import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/product/Product.css"; 

const Pdata = [
  {
    cover: "./images/discount/discount-1.png",
    name: "상품",
    price: "가격",
    time: "시간"
  },
  {
    cover: "./images/discount/discount-2.png",
    name: "상품",
    price: "가격",
    time: "시간"
  },
  {
    cover: "./images/discount/discount-2.png",
    name: "상품",
    price: "가격",
    time: "시간"
  },
  {
    cover: "./images/discount/discount-2.png",
    name: "상품",
    price: "가격",
    time: "시간"
  },
  {
    cover: "./images/discount/discount-2.png",
    name: "상품",
    price: "가격",
    time: "시간"
  },
  {
    cover: "./images/discount/discount-2.png",
    name: "상품",
    price: "가격",
    time: "시간"
  },
];

const ProductSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {Pdata.map((value, index) => (
        <div className="product-box" key={index}>
          <div className="img-container">
            <img src={value.cover} alt={`product-${index}`} />
          </div>
          <div className="product-details">
            <h4>{value.name}</h4>
            <span>{value.price}</span>
            <small>{value.time}</small>
          </div>
        </div>
      ))}
    </Slider>
  );
};

const ProductComponent = () => {
  return (
    <section className="product-section">
      <div className="container">
        <div className="heading d_flex">
          <div className="heading-left row f_flex">
            <h2>새로 등록된 상품</h2>
          </div>
        </div>
        <ProductSlider />
        <div className="more-button-container">
          <button className="more-button">더보기</button>
        </div>
      </div>
    </section>
  );
};

export default ProductComponent;

import React from "react";
import ECat from "./ECat";
import "../../styles/electronic/Electronic.css";

const ElectronicCart = () => {
  const placeholderItems = [
    {
      name: "상품",
      price: "가격",
      time: "시간"
    },
    {
      name: "상품",
      price: "가격",
      time: "시간"
    },
    {
      name: "상품",
      price: "가격",
      time: "시간"
    },
    {
      name: "상품",
      price: "가격",
      time: "시간"
    },
    {
      name: "상품",
      price: "가격",
      time: "시간"
    },
    {
      name: "상품",
      price: "가격",
      time: "시간"
    },
  ];

  return (
    <>
      {placeholderItems.map((item, index) => (
        <div className="electronic-box" key={index}>
          <div className="electronic-product mtop">
            <div className="electronic-img">
              <img src="path/to/placeholder.png" alt="placeholder" />
            </div>
            <div className="electronic-product-details">
              <h4>{item.name}</h4>
              <span>{item.price}</span>
              <small>{item.time}</small>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const Electronic = () => {
  return (
    <section className="electronic-shop background">
      <div className="container d_flex">
        <ECat />
        <div className="electronic-contentWidth">
          <div className="electronic-heading d_flex">
            <div className="electronic-heading-left row f_flex">
              <h2>전자기기</h2>
            </div>
            <div className="electronic-heading-right row">
              <span></span>
              <i className="fa-solid fa-caret-right"></i>
            </div>
          </div>
          <div className="electronic-product-content electronic-grid1">
            <ElectronicCart />
          </div>
          <div className="electronic-more-button-container">
            <button className="electronic-more-button">더보기</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Electronic;

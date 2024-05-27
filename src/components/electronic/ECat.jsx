import React from "react";
import "../../styles/electronic/ECat.css";

const ECat = () => {
  const data = [
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Apple",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Samsung",
    },
    {
      cateImg: "./images/category/cat-1.png",
      cateName: "Sony",
    },
    {
      cateImg: "./images/category/cat-2.png",
      cateName: "Huawei",
    },
  ];
  return (
    <>
      <div className="ecat-category">
        <div className="ecat-head d_flex">
          <h1>브랜드</h1>
          <h1> </h1>
        </div>
        {data.map((value, index) => (
          <div className="ecat-box f_flex" key={index}>
            <img src={value.cateImg} alt="" />
            <span>{value.cateName}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ECat;

import React from "react";
import "../../styles/category/Category.css";

const Category = () => {
  const categories = [
    {
      cateName: "패션의류",
    },
    {
      cateName: "패션잡화",
    },
    {
      cateName: "모바일/태블릿",
    },
    {
      cateName: "가전제품",
    },
    {
      cateName: "가구/인테리어",
    },
    {
      cateName: "액세서리",
    },
    {
      cateName: "뷰티",
    },
    {
      cateName: "스포츠",
    },
    {
      cateName: "기타",
    },
  ];

  return (
    <div className="category">
      {categories.map((value, index) => (
        <div className="box f_flex" key={index}>
          <span>{value.cateName}</span>
        </div>
      ))}
    </div>
  );
};

export default Category;

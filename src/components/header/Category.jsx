import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/header/Header.module.css";
import { FaChevronDown } from "react-icons/fa";

const Category = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategoryMenu = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const categories = [
    { cateName: "패션의류" },
    { cateName: "패션잡화" },
    { cateName: "전자기기" },
    { cateName: "가전제품" },
    { cateName: "가구/인테리어" },
    { cateName: "액세서리" },
    { cateName: "뷰티" },
    { cateName: "스포츠" },
    { cateName: "기타" },
  ];

  return (
    <div className={styles.categoryButtonWrapper}>
      <button onClick={toggleCategoryMenu} className={styles.categoryButton}>
        카테고리 <FaChevronDown className={styles.chevronIcon} />
      </button>
      {isCategoryOpen && (
        <div className={styles.categoryDropdown}>
          {categories.map((value, index) => (
            <Link to={`/category/${value.cateName}`} key={index} className={styles.categoryItem}>
              {value.cateName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;

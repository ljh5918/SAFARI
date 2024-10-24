// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styles from "../../styles/header/Header.module.css";
// import { FaChevronDown } from "react-icons/fa";

// const Category = ({ showCategories, setShowCategories }) => {
//   const [isCategoryOpen, setIsCategoryOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     setIsCategoryOpen(false);
//     setShowCategories(false);
//   }, [location, setShowCategories]);

//   const categories = [
//     { cateName: "패션의류" },
//     { cateName: "패션잡화" },
//     { cateName: "전자기기" },
//     { cateName: "가전제품" },
//     { cateName: "가구/인테리어" },
//     { cateName: "액세서리" },
//     { cateName: "뷰티" },
//     { cateName: "스포츠" },
//     { cateName: "기타" },
//   ];

//   const toggleCategoryMenu = () => {
//     setIsCategoryOpen((prevState) => !prevState);
//   };

//   const renderCategories = () => (
//     <div className={styles.categoryDropdown}>
//       {categories.map((category, index) => (
//         <Link
//           to={`/category/${category.cateName}`}
//           key={index}
//           className={styles.categoryItem}
//         >
//           {category.cateName}
//         </Link>
//       ))}
//     </div>
//   );

//   return (
//     <div className={styles.categoryButtonWrapper}>
//       <button onClick={toggleCategoryMenu} className={styles.categoryButton}>
//         카테고리 <FaChevronDown className={styles.chevronIcon} />
//       </button>
//       {isCategoryOpen && renderCategories()}
//     </div>
//   );
// };

// export default Category;














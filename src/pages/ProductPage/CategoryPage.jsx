// // import React from "react";
// // import Product from "../../components/product/Product";
// // import { useParams } from "react-router-dom";
// // import styles from "../../styles/product/ProductPage.module.css";

// // const CategoryPage = () => {
// //   const { categoryName } = useParams();

// //   return (
// //     <div className={styles.productPage}>
// //       <h1>{categoryName}</h1>
// //       <Product />
// //     </div>
// //   );
// // };

// // export default CategoryPage;





import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const fetchProductsByCategory = async () => {
      const token = localStorage.getItem('token');  // 로컬 스토리지에서 토큰 가져오기

      try {
        const response = await axios.get(`http://localhost:8080/items/category/${categoryName}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Authorization 헤더에 토큰 추가
          },
        });
        setProducts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('인증 오류: 유효한 토큰이 없습니다.');
        } else {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProductsByCategory();
  }, [categoryName]);

  return (
    <div>
      <h1>{categoryName} 카테고리의 상품 목록</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.itemNm}</li>
          ))}
        </ul>
      ) : (
        <p>해당 카테고리의 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default CategoryPage;

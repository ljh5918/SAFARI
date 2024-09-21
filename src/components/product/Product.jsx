import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Search/SearchResult.module.css'; 

const calculateElapsedTime = (timestamp) => {
  const now = Date.now();
  const elapsedTime = now - timestamp;

  const minutes = Math.floor(elapsedTime / 60000);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }

  const days = Math.floor(hours / 24);
  return `${days}일 전`;
};

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 상품을 가져오기
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    // 최신 상품이 먼저 오도록 상품을 ID 내림차순으로 정렬
    const sortedProducts = storedProducts.sort((a, b) => b.id - a.id);
    setProducts(sortedProducts);
  }, []);

  const loadMoreProducts = () => {
    // 더 많은 상품을 가져오는 로직
  };


  const handleClick = (id) => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productSection}>
        <div className={styles.heading}>
          <h2>새로 등록된 상품</h2>
        </div>
        <div className={styles.productGrid}>
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className={styles.productBox}
                onClick={() => handleClick(product.id)}
              >
                <div className={styles.productImg}>
                  <img src={product.images[0]} alt={product.title} />
                  {product.status === 'RESERVED' && (
                    <div className={styles.reserved}>
                      <h2>예약중</h2>
                    </div>
                  )}
                  {product.status === 'SOLD' && (
                    <div className={styles.sold}>
                      <h2>거래완료</h2>
                    </div>
                  )}
                </div>
                <div className={styles.productDetails}>
                  <h4>{product.title}</h4>
                  <span>{product.price} 원</span>
                  <p>{calculateElapsedTime(product.timestamp)}</p>
                  <p>❤️ {product.likes || 0} 조회수 {product.chats || 0}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResultsMessage}>
              상품을 찾지 못했습니다.
            </div>
          )}
        </div>
        {products.length > 0 && (
          <div className={styles.moreButtonContainer}>
            <button onClick={loadMoreProducts} className={styles.loadMoreButton}>
              더보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
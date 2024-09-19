import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/Search/SearchResult.module.css';

const calculateElapsedTime = (timestamp) => {
  const now = Date.now();
  const elapsedTime = now - timestamp;  // 초 단위로 경과 시간 계산

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

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';

    const products = JSON.parse(localStorage.getItem('products')) || [];
    
    const filteredResults = products
      .filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); 

    setResults(filteredResults);
  }, [location.search]);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.productSection}>
        <div className={styles.heading}>
          <h2>검색 카테고리 구현</h2>
        </div>
        <div className={styles.productGrid}>
          {results.length > 0 ? (
            results.map((product) => (
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
                  <p>❤️ {product.likes} 💬 {product.chats}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResultsMessage}>
              에 대한 검색결과가 없습니다.
            </div>
          )}
        </div>
        {results.length > 0 && (
          <div className={styles.moreButtonContainer}>
            <button className={styles.loadMoreButton}>더 보기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;

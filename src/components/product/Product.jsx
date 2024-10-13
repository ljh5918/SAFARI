import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Search/SearchResult.module.css';

const calculateElapsedTime = (timestamp) => {
  const now = Date.now();
  const elapsedTime = now - new Date(timestamp).getTime();
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
  const [products, setProducts] = useState([]); // Maintain product list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (page = 0) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    console.log(token);

    try {
      const response = await axios.get('http://localhost:8080', {
        params: { page },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });

      console.log('API response:', response.data);
      const items = response.data.items || [];
      console.log('Fetched items:', items);
      
      // Instead of appending, just set the products for the fetched page
      setProducts(items);
      
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('상품을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreProducts = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchProducts(nextPage);
  };

  const handleClick = (id) => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.productSection}>
        <div className={styles.heading}>
          <h2>새로 등록된 상품</h2>
        </div>
        <div className={styles.productGrid}>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className={styles.productBox}
                onClick={() => handleClick(product.id)}
              >
                <div className={styles.productImg}>
                  <img 
                    src={`http://localhost:8080${product.imgUrl}`} // Product image URL
                    alt={product.itemNm}
                  />
                  {product.itemSellStatus === 'RESERVED' && (
                    <div className={styles.reserved}>
                      <h2>예약중</h2>
                    </div>
                  )}
                  {product.itemSellStatus === 'SOLD' && (
                    <div className={styles.sold}>
                      <h2>거래완료</h2>
                    </div>
                  )}
                </div>
                <div className={styles.productDetails}>
                  <h4>{product.itemNm}</h4>
                  <span>{product.price} 원</span>
                  <p>{product.regTime ? calculateElapsedTime(product.regTime) : ''}</p>
                  <p>❤️ {product.wishlistCount || 0} 조회수 {product.views || 0}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResultsMessage}>
              상품을 찾지 못했습니다.
            </div>
          )}
        </div>
        {Array.isArray(products) && products.length > 0 && (
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










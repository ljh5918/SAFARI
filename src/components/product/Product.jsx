import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Search/SearchResult.module.css';

// import soldout from '../../images/naverlogin.png';

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
  const [products, setProducts] = useState([]); // 전체 상품 목록
  const [soldOutProducts, setSoldOutProducts] = useState([]); // 판매 완료된 상품 목록
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchSoldOutProducts(); // 판매 완료된 상품도 가져오기
  }, []);

  const fetchProducts = async (page = 0) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:8080', {
        params: { page }, // 페이지네이션 지원
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });

      console.log('API response:', response.data);
      const items = response.data.items || [];
      setProducts(items);

    } catch (error) {
      console.error('Error fetching items:', error);
      setError('상품을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const fetchSoldOutProducts = async () => {
    const memberId = localStorage.getItem('memberId'); // 현재 로그인한 사용자의 memberId를 가져오는 로직 필요
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get(`http://localhost:8080/seller/soldout`, {
        params: { memberId }, // 판매 완료된 상품을 가져오기 위한 파라미터
        headers: {
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });

      setSoldOutProducts(response.data);
      console.log('Sold Out Products response:', response.data);

    } catch (error) {
      console.error('Error fetching sold out items:', error);
      setError('판매 완료된 상품을 불러오는 중 오류가 발생했습니다.');
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
          <h2>모든 상품</h2>
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
                    src={`http://localhost:8080${product.imgUrl}`} // 상품 이미지 URL
                    alt={product.itemNm}
                  />
                  {/* 판매 완료 표시 */}
                  {soldOutProducts.some(soldOutProduct => soldOutProduct.id === product.id) && (
                    <div className={styles.soldOut}>
                      {/* <img src={soldout} alt="판매완료" /> soldout 이미지를 사용합니다. */}
                      <img src="/logo512.png" alt="판매완료" /> {/* public 폴더의 이미지 경로 */}
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

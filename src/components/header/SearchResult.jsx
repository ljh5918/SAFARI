import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSearchResults();
  }, [location.search, currentPage]);

  const fetchSearchResults = async () => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';  // 검색어 가져오기
    const page = currentPage;  // 현재 페이지 가져오기

    try {
      const response = await axios.get(`/search`, {
        params: { searchQuery: query, page }
      });
      const data = response.data;

      setResults(data.items || []);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('검색 결과를 가져오는 중 오류가 발생했습니다:', error);
      setError('검색 결과를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  };

  const loadMoreResults = () => {
    if (currentPage + 1 < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
          <h2>검색 결과</h2>
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
                  <img 
                    src={`http://localhost:8080${product.imgUrl}`} 
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
              검색결과가 없습니다.
            </div>
          )}
        </div>
        {results.length > 0 && currentPage + 1 < totalPages && (
          <div className={styles.moreButtonContainer}>
            <button className={styles.loadMoreButton} onClick={loadMoreResults}>
              더 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;











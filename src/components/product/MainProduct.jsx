import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import styles from '../../styles/product/Product.module.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.get('http://localhost:8080', {
        params: { page },
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });

      const items = response.data.items || [];
      const soldItemIds = response.data.soldItemIds || [];

      if (page === 0) {
        setProducts(items);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...items]);
      }
      setSoldItems(soldItemIds);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('상품을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (productId, isSold) => {
    if (isSold) {
      alert('판매완료된 상품입니다.'); 
    } else {
      navigate(`/products/${productId}`); 
    }
  };

  const loadMoreProducts = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={styles.productContainer}>
      <div className={styles.productSection}>
        <div className={styles.heading}>
          <h2>새로 등록된 상품</h2>
        </div>
        {loading && <p>로딩 중...</p>}
        {error && <p>{error}</p>}
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div
              key={product.id}
              className={styles.productBox}
              onClick={() => handleClick(product.id, soldItems.includes(product.id))} 
            >
              <div className={styles.productImg}>
                <img
                  src={`http://localhost:8080${product.imgUrl}`}
                  alt={product.itemNm}
                />
                {soldItems.includes(product.id) && (
                  <div className={styles.sold}>
                    <h2>판매완료</h2>
                  </div>
                )}
              </div>
              <div className={styles.productDetails}>
                <h4>{product.itemNm}</h4>
                <span>{product.price.toLocaleString()} 원</span>
                {/* <p>{product.regTime ? calculateElapsedTime(product.regTime) : ''}</p> */}
                {/* <p>❤️ {product.wishlistCount || 0} 조회수 {product.views || 0}</p> */}
              </div>
            </div>
          ))}
        </div>
        {!loading && products.length > 0 && (
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

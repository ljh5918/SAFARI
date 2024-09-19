import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/product/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Fetch the product from localStorage based on the ID from URL
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find((item) => item.id === parseInt(id));

    if (foundProduct) {
      setProduct(foundProduct);
      setLikes(foundProduct.likes || 0);
    }
  }, [id]);

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.productInfo}>
        <div className={styles.productImage}>
          <img src={product.images[0]} alt={product.title} />
        </div>
        <div className={styles.productContent}>
          <h1>{product.title}</h1>
          <div className={styles.productPrice}>{product.price} 원</div>
          <div className={styles.productStats}>
            <span>❤️ {likes}</span>
            <span>👀 {product.views || 0}</span>
            <span>🕒 {new Date(product.timestamp).toLocaleString()}</span>
          </div>
          <div className={styles.productDetails}>
            <p>상품상태: {product.status}</p>
            <p>배송비: {product.deliveryFee || '무료배송'}</p>
          </div>
          <div className={styles.actionButtons}>
            <button onClick={handleLike} className={styles.likeButton}>
              찜하기
            </button>
            <button className={styles.chatButton}>채팅하기</button>
            <button className={styles.buyButton}>구매하기</button>
          </div>
        </div>
      </div>
      <div className={styles.productDescription}>
        <h2>상품정보</h2>
        <p>{product.description}</p>
      </div>
      <div className={styles.relatedProducts}>
        <h2>연관상품</h2>
        <div className={styles.relatedProductList}>
          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            product.relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className={styles.relatedProduct}>
                <img src={relatedProduct.image} alt={relatedProduct.title} />
                <p>{relatedProduct.title}</p>
                <span>{relatedProduct.price}</span>
              </div>
            ))
          ) : (
            <p>연관 상품이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

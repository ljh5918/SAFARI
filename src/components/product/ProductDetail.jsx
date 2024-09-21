import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/product/ProductDetail.module.css";
import Chat from '../../pages/MyPage/Chat';
import Modal from '../chat/Modal';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    const foundProduct = storedProducts.find((item) => item.id === parseInt(id));

    if (foundProduct) {
      setProduct(foundProduct);
      setLikes(foundProduct.likes || 0);
      setLiked(foundProduct.liked || false);
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = storedProducts.map((item) =>
        item.id === parseInt(id) ? { ...item, likes, liked } : item
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  }, [likes, liked, id, product]);

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    setLikes(newLikes);
    setLiked(newLiked);

    let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
    if (newLiked) {
      likedProducts.push({
        id: product.id,
        name: product.title,
        price: product.price,
        imageUrl: product.images[0]
      });
    } else {
      likedProducts = likedProducts.filter(p => p.id !== product.id);
    }
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

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
            <span>
              {liked ? '❤️' : '🤍'} {likes}
            </span>
            <span>조회수 {product.views || 0}</span>
            <span>등록시간 {new Date(product.timestamp).toLocaleString()}</span>
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.likeButton} onClick={handleLike}>
              {liked ? '찜 취소' : '찜하기'}
            </button>
            <button className={styles.chatButton} onClick={handleOpenChat}>채팅하기</button>
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

      <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
        <Chat />
      </Modal>
    </div>
  );
};

export default ProductDetail;

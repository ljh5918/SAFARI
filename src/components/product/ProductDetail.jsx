import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import styles from "../../styles/product/ProductDetail.module.css";
import Chat from '../../pages/MyPage/Chat';
import Modal from '../chat/Modal';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/item/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const productData = response.data;
        console.log('Fetched product data:', productData); // Log the fetched product data for debugging

        // Use the first image in the list as the main product image
        const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;

        setProduct({ ...productData, imgUrl: mainImage }); // Include the main image URL in the product state
        setLikes(productData.likes || 0);
        setLiked(productData.liked || false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
        } else {
          setError('상품을 불러오는 중 오류가 발생했습니다.');
        }
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    setLikes(newLikes);
    setLiked(newLiked);
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.productDetail}>
      <div className={styles.productInfo}>
        <div className={styles.productImage}>
          {/* Use full image URL */}
          <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} />
        </div>
        <div className={styles.productContent}>
          <h1>{product.itemNm}</h1>
          <div className={styles.productPrice}>{product.price} 원</div>
          <div className={styles.productStats}>
            <span>{liked ? '❤️' : '🤍'} {likes}</span>
            <span>조회수 {product.views || 0}</span>
            <span>등록시간 {new Date(product.regTime).toLocaleString()}</span>
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
        <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
      </div>
      <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
        <Chat />
      </Modal>
    </div>
  );
};

export default ProductDetail;

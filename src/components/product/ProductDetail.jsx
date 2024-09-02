import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../../styles/product/ProductDetail.module.css";

const productsData = [
  {
    id: 1,
    image: "/images/image1.png",
    title: "newjeans 'How sweet' 앨범 분철",
    price: "12,000원",
    likes: 35,
    views: 1607,
    time: "10시간 전",
    status: "새 상품",
    deliveryFee: "일반 2,000원",
    description: `분철 경험 다수! 세트 구매 완료!
원가 이하!
찜 하신 분들 편하게 연락주세요!
뉴진스 ‘How sweet’ 판매합니다!
배송오자마자 미개봉으로 보내드려요! (((특전 제외)))
해린 1.8 ❌
하니 1.8 ❌
민지 1.5 ❌
단체 1.6 ❌
혜인 1.4 ❌
다니엘 1.4 ❌
해린/하니 + 혜인/다니엘 으로 밀어내기 가능!
교환 환불 불가`,
    relatedProducts: [
      {
        id: 2,
        image: "/images/image2.png",
        title: "뉴진스 해린 젯업 버니 비치백",
        price: "28,000원",
      },
      {
        id: 3,
        image: "/images/image3.png",
        title: "아이브 비공굿 1.5배랜박도무송",
        price: "999원",
      },
    ],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((item) => item.id === parseInt(id));
  const [likes, setLikes] = useState(product?.likes || 0);

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
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.productContent}>
          <h1>{product.title}</h1>
          <div className={styles.productPrice}>{product.price}</div>
          <div className={styles.productStats}>
            <span>❤️ {likes}</span>
            <span>👀 {product.views}</span>
            <span>🕒 {product.time}</span>
          </div>
          <div className={styles.productDetails}>
            <p>상품상태: {product.status}</p>
            <p>배송비: {product.deliveryFee}</p>
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
          {product.relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className={styles.relatedProduct}>
              <img src={relatedProduct.image} alt={relatedProduct.title} />
              <p>{relatedProduct.title}</p>
              <span>{relatedProduct.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

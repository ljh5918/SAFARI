  // import React, { useState, useEffect } from "react"; 
  // import { useParams } from "react-router-dom";
  // import axios from 'axios';
  // import styles from "../../styles/product/ProductDetail.module.css";
  // import Chat from '../../pages/MyPage/Chat';
  // import Modal from '../chat/Modal';

  // const ProductDetail = () => {
  //   const { id } = useParams();
  //   const [product, setProduct] = useState(null);
  //   const [likes, setLikes] = useState(0);
  //   const [liked, setLiked] = useState(false);
  //   const [isChatOpen, setIsChatOpen] = useState(false);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [memberId, setMemberId] = useState(null); // State to store member ID

  //   useEffect(() => {
  //     const fetchProduct = async () => {
  //       const token = localStorage.getItem('token');

  //       try {
  //         const response = await axios.get(`http://localhost:8080/item/${id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         const productData = response.data;
  //         console.log('Fetched product data:', productData);

  //         const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;

  //         setProduct({ ...productData, imgUrl: mainImage });
  //         setLikes(productData.likes || 0);
  //         setLiked(productData.liked || false);
  //       } catch (error) {
  //         if (error.response && error.response.status === 401) {
  //           setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
  //         } else {
  //           setError('상품을 불러오는 중 오류가 발생했습니다.');
  //         }
  //         console.error('Error fetching product details:', error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     const fetchMemberInfo = async () => {
  //       const token = localStorage.getItem('token');

  //       try {
  //         const response = await axios.get(`http://localhost:8080/members/myInfo`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });

  //         const memberData = response.data;
  //         console.log('Fetched member data:', memberData);
  //         setMemberId(memberData.id); // Assuming memberData has an 'id' property
  //       } catch (error) {
  //         console.error('Error fetching member info:', error);
  //         // Handle error, e.g., show an error message
  //       }
  //     };

  //     fetchProduct();
  //     fetchMemberInfo(); // Call the function to fetch member info
  //   }, [id]);

  //   const handleLike = async () => {
  //     if (!memberId) {
  //       console.error('Member ID is not available. Cannot proceed with the request.');
  //       return; // Prevent the request
  //     }
    
  //     const token = localStorage.getItem('token');
  //     const itemId = product.id;
    
  //     console.log('Token:', token);
  //     console.log('Member ID:', memberId);
  //     console.log('Item ID:', itemId);
    
  //     try {
  //       const response = await axios.post(
  //         'http://localhost:8080/wishlist/add',
  //         null,
  //         {
  //           params: { memberId, itemId },
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
    
  //       console.log('Response:', response.data);
  //       setLiked(!liked);
  //       setLikes(liked ? likes - 1 : likes + 1);
  //     } catch (error) {
  //       if (error.response) {
  //         console.error('Error response:', error.response);

  //         console.error('Error response:', error.response.data);
  //         console.error('Error status:', error.response.status);
  //       } else {
  //         console.error('Error:', error.message);
  //       }
  //     }
  //   };
    
  //   const handleOpenChat = () => {
  //     setIsChatOpen(true);
  //   };

  //   const handleCloseChat = () => {
  //     setIsChatOpen(false);
  //   };

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (error) {
  //     return <div>{error}</div>;
  //   }

  //   if (!product) {
  //     return <div>상품을 찾을 수 없습니다.</div>;
  //   }

  //   return (
  //     <div className={styles.productDetail}>
  //       <div className={styles.productInfo}>
  //         <div className={styles.productImage}>
  //           <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} />
  //         </div>
  //         <div className={styles.productContent}>
  //           <h1>{product.itemNm}</h1>
  //           <div className={styles.productPrice}>{product.price} 원</div>
  //           <div className={styles.productStats}>
  //             <span>{liked ? '❤️' : '🤍'} {likes}</span>
  //             <span>조회수 {product.views || 0}</span>
  //             <span>등록시간 {new Date(product.regTime).toLocaleString()}</span>
  //           </div>
  //           <div className={styles.actionButtons}>
  //             <button className={styles.likeButton} onClick={handleLike}>
  //               {liked ? '찜 취소' : '찜하기'}
  //             </button>
  //             <button className={styles.chatButton} onClick={handleOpenChat}>채팅하기</button>
  //           </div>
  //         </div>
  //       </div>
  //       <div className={styles.productDescription}>
  //         <h2>상품정보</h2>
  //         <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
  //       </div>
  //       <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
  //         <Chat />
  //       </Modal>
  //     </div>
  //   );
  // };

  // export default ProductDetail;

















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
  const [memberId, setMemberId] = useState(null);

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
        const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;

        setProduct({ ...productData, imgUrl: mainImage });
        setLikes(productData.likes || 0);
        setLiked(productData.liked || false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
        } else {
          setError('상품을 불러오는 중 오류가 발생했습니다.');
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchMemberInfo = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8080/members/myInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const memberData = response.data;
        setMemberId(memberData.id);
      } catch (error) {
        console.error('Error fetching member info:', error);
      }
    };

    fetchProduct();
    fetchMemberInfo();
  }, [id]);

  const handleLike = async () => {
    if (!memberId) {
      console.error('Member ID is not available. Cannot proceed with the request.');
      return;
    }
  
    const token = localStorage.getItem('token');
    const itemId = product.id;
  
    try {
      await axios.post(
        'http://localhost:8080/wishlist/add',
        null,
        {
          params: { memberId, itemId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
      } else {
        console.error('Error:', error.message);
      }
    }
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

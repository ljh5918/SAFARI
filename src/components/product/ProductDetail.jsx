
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import styles from "../../styles/product/ProductDetail.module.css";
import Chat from '../../pages/MyPage/Chat'; // Chat component
import Modal from '../chat/Modal'; // Modal component

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [senderId, setSenderId] = useState(null);

  // Fetch product and member info
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:8080/item/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const productData = response.data;
        const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;

        setProduct({ ...productData, imgUrl: mainImage });
        setLikes(productData.likes || 0);
        setLiked(productData.liked || false);
      } catch (error) {
        handleError(error, '상품을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    const fetchMemberInfo = async () => {
      const token = localStorage.getItem('token');
      const memberId = localStorage.getItem('memberId');

      if (memberId) {
        setMemberId(memberId);
        setSenderId(memberId); 
      } else {
        try {
          const response = await axios.get(`http://localhost:8080/members/myInfo`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const memberData = response.data;
          setMemberId(memberData.id);
          setSenderId(memberData.id);
          localStorage.setItem('memberId', memberData.id);
        } catch (error) {
          handleError(error, 'Error fetching member info.');
        }
      }
    };

    fetchProduct();
    fetchMemberInfo();

    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, [id, webSocket]);

  const handleError = (error, fallbackMessage) => {
    if (error.response && error.response.status === 401) {
      setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
    } else {
      setError(fallbackMessage);
    }
  };

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    const itemId = product.id;

    try {
      await axios.post('http://localhost:8080/wishlist/add', null, {
        params: { memberId, itemId },
        headers: { Authorization: `Bearer ${token}` },
      });

      setLiked(!liked);
      setLikes(liked ? likes - 1 : likes + 1);
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleOpenChat = async () => {
    if (!memberId) {
      console.error('Member ID is not available.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:8080/item/${id}/chat`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const chatRoomData = response.data;
      if (chatRoomData?.roomId) {
        setRoomId(chatRoomData.roomId);

        // Fetch previous messages
        const messageResponse = await axios.get(`http://localhost:8080/chat/${chatRoomData.roomId}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(messageResponse.data);

        // Set up WebSocket connection
        const socket = new WebSocket(`ws://localhost:8080/ws/${chatRoomData.roomId}/${memberId}?token=${token}`);
        socket.onopen = () => console.log('WebSocket connected');
        socket.onmessage = (event) => {
          const incomingMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, incomingMessage]);
        };
        socket.onclose = () => console.log('WebSocket closed');
        setWebSocket(socket);
        setIsChatOpen(true);
      }
    } catch (error) {
      console.error('Error starting chat:', error);
    }
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    if (webSocket) {
      webSocket.close();
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;

    const messageData = {
      roomId,
      senderId,
      memberId,
      content: messageInput.trim(),
    };

    console.log('Sending message:', messageData);
    webSocket.send(JSON.stringify(messageData));
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessageInput('');
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
            {/* <span>{liked ? '❤️' : '🤍'} {likes}</span> */}
            {/* <span>조회수 {product.views || 0}</span> */}
            {/* <span>등록시간 {new Date(product.regTime).toLocaleString()}</span> */}
          </div>
          <div className={styles.actionButtons}>
            <button className={styles.likeButton} onClick={handleLike}>
              {liked ? '찜 취소' : '찜하기'}
            </button>
            <button className={styles.chatButton} onClick={handleOpenChat}>채팅하기</button>
          </div>
        </div>
      </div>

      <div className={styles.productDetailsContainer}>
        <div className={styles.productDescription}>
          <h2 className={styles.sectionTitle}>상품 정보</h2>
          <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
        </div>
        {/* <div className={styles.storeProfileWrapper}>
          <h2 className={styles.sectionTitle}>판매자 상점</h2>
          <div className={styles.storeProfile}>
            <div className={styles.profileInfo}>
              <Link to={`/Seller-Profile/${product.sellerNickname}`} className={styles.profilePic}>
                <i className={`${styles.icon} fas fa-store`}></i>
              </Link>
              <div className={styles.storeName}>{product.sellerNickname || '판매자 닉네임'}</div>
            </div>
          </div>
        </div> */}
      </div>

      {/* <div className={styles.relatedProducts}>
        <h2 className={styles.sectionTitle}>연관 상품</h2>
        <div className={styles.relatedProductList}>
          {product.relatedProducts?.map((relatedProduct) => (
            <div key={relatedProduct.id} className={styles.relatedProductItem}>
              <Link to={`/product/${relatedProduct.id}`}>
                <img src={`http://localhost:8080${relatedProduct.imgUrl}`} alt={relatedProduct.itemNm} />
                <div className={styles.relatedProductName}>{relatedProduct.itemNm}</div>
                <div className={styles.relatedProductPrice}>{relatedProduct.price} 원</div>
              </Link>
            </div>
          ))}
        </div>
      </div> */}

      {isChatOpen && (
          <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
                    <Chat 
                      roomId={roomId}
                      messages={messages} 
                      messageInput={messageInput} 
                      setMessageInput={setMessageInput} 
                      sendMessage={sendMessage} 
                      senderId={senderId} // Pass senderId to Chat component
                      productTitle={product.itemNm} // Pass the product title to Chat
                    />
                  </Modal>
      )}
    </div>
  );
};

export default ProductDetail;









































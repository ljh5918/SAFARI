// // import React, { useState, useEffect } from "react";
// // import { Navigate } from "react-router-dom";
// // import { useParams, Link } from "react-router-dom";
// // import axios from 'axios';
// // import styles from "../../styles/product/ProductDetail.module.css";
// // import Chat from '../../pages/MyPage/Chat';
// // import Modal from '../chat/Modal';

// // const ProductDetail = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [likes, setLikes] = useState(0);
// //   const [liked, setLiked] = useState(false);
// //   const [isChatOpen, setIsChatOpen] = useState(false);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [memberId, setMemberId] = useState(null);
// //   const [roomId, setRoomId] = useState(null);
  
// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       const token = localStorage.getItem('token');
// //       try {
// //         const response = await axios.get(`http://localhost:8080/item/${id}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         const productData = response.data;
// //         const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;

// //         setProduct({ ...productData, imgUrl: mainImage });
// //         setLikes(productData.likes || 0);
// //         setLiked(productData.liked || false);
// //       } catch (error) {
// //         if (error.response && error.response.status === 401) {
// //           setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
// //         } else {
// //           setError('상품을 불러오는 중 오류가 발생했습니다.');
// //         }
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  

// //     const fetchMemberInfo = async () => {
// //       const token = localStorage.getItem('token');
// //       try {
// //         const response = await axios.get(`http://localhost:8080/members/myInfo`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         const memberData = response.data;
// //         setMemberId(memberData.id);
// //       } catch (error) {
// //         console.error('Error fetching member info:', error);
// //       }
// //     };

// //     fetchProduct();
// //     fetchMemberInfo();
// //   }, [id]);

// //   const handleLike = async () => {
// //     if (!memberId) {
// //       console.error('Member ID is not available. Cannot proceed with the request.');
// //       return;
// //     }

// //     const token = localStorage.getItem('token');
// //     const itemId = product.id;

// //     try {
// //       await axios.post(
// //         'http://localhost:8080/wishlist/add',
// //         null,
// //         {
// //           params: { memberId, itemId },
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setLiked(!liked);
// //       setLikes(liked ? likes - 1 : likes + 1);
// //     } catch (error) {
// //       if (error.response) {
// //         console.error('Error response:', error.response);
// //       } else {
// //         console.error('Error:', error.message);
// //       }
// //     }
// //   };

// //   const handleOpenChat = async () => {
// //     if (!memberId) {
// //       console.error('Member ID is not available. Cannot proceed with chat.');
// //       return;
// //     }
  
// //     const token = localStorage.getItem('token');
// //     try {
// //       const response = await axios.post(
// //         // 채팅 시작
// //         `http://localhost:8080/item/${id}/chat`,
// //         null,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       // Log the entire response data for debugging
// //       console.log('Chat Room Response:', response.data);
  
// //       const chatRoomData = response.data;
  
// //       // Access roomId from chatRoomData
// //       if (chatRoomData && chatRoomData.roomId) {
// //         setRoomId(chatRoomData.roomId); // Update to use roomId instead of id
// //         console.log('Chat Room ID:', chatRoomData.roomId); // Debugging
// //         setIsChatOpen(true);
// //       } else {
// //         console.error('Chat Room ID is missing in the response');
// //       }
// //     } catch (error) {
// //       console.error('Error starting chat:', error);
// //       if (error.response) {
// //         console.error('Error response:', error.response.data); // More detailed error logging
// //       }
// //     }
// //   };
  
// //   const handleCloseChat = () => {
// //     setIsChatOpen(false);
// //   };

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>{error}</div>;
// //   }

// //   if (!product) {
// //     return <div>상품을 찾을 수 없습니다.</div>;
// //   }

// //   return (
// //     <div className={styles.productDetail}>
// //       <div className={styles.productInfo}>
// //         <div className={styles.productImage}>
// //           <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} />
// //         </div>
// //         <div className={styles.productContent}>
// //           <h1>{product.itemNm}</h1>
// //           <div className={styles.productPrice}>{product.price} 원</div>
// //           <div className={styles.productStats}>
// //             <span>{liked ? '❤️' : '🤍'} {likes}</span>
// //             <span>조회수 {product.views || 0}</span>
// //             <span>등록시간 {new Date(product.regTime).toLocaleString()}</span>
// //           </div>
// //           <div className={styles.actionButtons}>
// //             <button className={styles.likeButton} onClick={handleLike}>
// //               {liked ? '찜 취소' : '찜하기'}
// //             </button>
// //             <button className={styles.chatButton} onClick={handleOpenChat}>채팅하기</button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Additional Sections */}
// //       <div className={styles.productDetailsContainer}>
// //         <div className={styles.productDescription}>
// //           <h2 className={styles.sectionTitle}>상품 정보</h2>
// //           <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
// //         </div>
// //         <div className={styles.storeProfileWrapper}>
// //           <h2 className={styles.sectionTitle}>판매자 상점</h2>
// //           <div className={styles.storeProfile}>
// //             <div className={styles.profileInfo}>
// //               <Link to={`/Seller-Profile/${product.sellerNickname}`} className={styles.profilePic}>
// //                 <i className={`${styles.icon} fas fa-store`}></i>
// //               </Link>
// //               <div className={styles.storeName}>{product.sellerNickname || '판매자 닉네임'}</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className={styles.relatedProducts}>
// //         <h2 className={styles.sectionTitle}>연관 상품</h2>
// //         <div className={styles.relatedProductList}>
// //           {product.relatedProducts && product.relatedProducts.length > 0 ? (
// //             product.relatedProducts.map((relatedProduct) => (
// //               <div key={relatedProduct.id} className={styles.relatedProduct}>
// //                 <img src={relatedProduct.image} alt={relatedProduct.title} />
// //                 <p>{relatedProduct.title}</p>
// //                 <span>{relatedProduct.price} 원</span>
// //               </div>
// //             ))
// //           ) : (
// //             <p>연관 상품이 없습니다.</p>
// //           )}
// //         </div>
// //       </div>

// //       {/* Chat Component */}
// //       {/* {isChatOpen && (
// //         <div className={styles.chatContainer}>
// //           <Chat roomId={roomId}  onClose={handleCloseChat} />
// //         </div>
// //       )} */}

// //        <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
// //         <Chat roomId={roomId} memberId={memberId} />
// //       </Modal>
      
// //     </div>
// //   );
// // };

// // export default ProductDetail;






















































// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from 'axios';
// // import styles from "../../styles/product/ProductDetail.module.css";
// // import Chat from '../../pages/MyPage/Chat'; // Chat 컴포넌트
// // import Modal from '../chat/Modal'; // Modal 컴포넌트

// // const ProductDetail = () => {
// //     const { id } = useParams();
// //     const [product, setProduct] = useState(null);
// //     const [likes, setLikes] = useState(0);
// //     const [liked, setLiked] = useState(false);
// //     const [isChatOpen, setIsChatOpen] = useState(false);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [memberId, setMemberId] = useState(null);
// //     const [roomId, setRoomId] = useState(null);
// //     const [webSocket, setWebSocket] = useState(null);
// //     const [messages, setMessages] = useState([]);
// //     const [messageInput, setMessageInput] = useState('');

// //     // 상품 정보 및 회원 정보 가져오기
// //     useEffect(() => {
// //         const fetchProduct = async () => {
// //             const token = localStorage.getItem('token');
// //             try {
// //                 const response = await axios.get(
// //                     `http://localhost:8080/item/${id}`,
// //                     {
// //                         headers: { Authorization: `Bearer ${token}` },
// //                     }
// //                 );
// //                 const productData = response.data;
// //                 const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;
// //                 setProduct({ ...productData, imgUrl: mainImage });
// //                 setLikes(productData.likes || 0);
// //                 setLiked(productData.liked || false);
// //             } catch (error) {
// //                 if (error.response && error.response.status === 401) {
// //                     setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
// //                 } else {
// //                     setError('상품을 불러오는 중 오류가 발생했습니다.');
// //                 }
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         const fetchMemberInfo = async () => {
// //             const token = localStorage.getItem('token');
// //             try {
// //                 const response = await axios.get(
// //                     `http://localhost:8080/members/myInfo`,
// //                     {
// //                         headers: { Authorization: `Bearer ${token}` },
// //                     }
// //                 );
// //                 const memberData = response.data;
// //                 setMemberId(memberData.id);
// //             } catch (error) {
// //                 console.error('회원 정보를 가져오는 중 오류 발생:', error);
// //             }
// //         };

// //         fetchProduct();
// //         fetchMemberInfo();
// //     }, [id]);

// //     const handleLike = async () => {
// //         if (!memberId) {
// //             console.error('회원 ID를 사용할 수 없습니다. 요청을 진행할 수 없습니다.');
// //             return;
// //         }
// //         const token = localStorage.getItem('token');
// //         const itemId = product.id;
// //         try {
// //             await axios.post(
// //                 'http://localhost:8080/wishlist/add',
// //                 null,
// //                 {
// //                     params: { memberId, itemId },
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 }
// //             );
// //             setLiked(!liked);
// //             setLikes(liked ? likes - 1 : likes + 1);
// //         } catch (error) {
// //             console.error('오류:', error.response || error.message);
// //         }
// //     };

// //     const handleOpenChat = async () => {
// //       if (!memberId) {
// //           console.error('회원 ID를 사용할 수 없습니다.');
// //           return;
// //       }
// //       const token = localStorage.getItem('token');
// //       try {
// //           const response = await axios.post(
// //               `http://localhost:8080/item/${id}/chat`,
// //               null,
// //               {
// //                   headers: { Authorization: `Bearer ${token}` },
// //               }
// //           );
// //           const chatRoomData = response.data;
// //           if (chatRoomData && chatRoomData.roomId) {
// //               setRoomId(chatRoomData.roomId);
  
// //               // Fetch previous chat messages
// //               const messageResponse = await axios.get(
// //                   `http://localhost:8080/chat/${chatRoomData.roomId}/messages`,
// //                   {
// //                       headers: { Authorization: `Bearer ${token}` },
// //                   }
// //               );
// //               setMessages(messageResponse.data);
  
// //               const socket = new WebSocket(`ws://localhost:8080/ws/${chatRoomData.roomId}/${memberId}?token=${token}`);
// //               socket.onopen = () => {
// //                   console.log('웹소켓 연결 성공');
// //               };
// //               socket.onmessage = (event) => {
// //                   const incomingMessage = JSON.parse(event.data);
// //                   setMessages((prevMessages) => [...prevMessages, incomingMessage]);
// //               };
// //               socket.onclose = () => {
// //                   console.log('웹소켓 연결 종료');
// //               };
// //               setWebSocket(socket);
// //               setIsChatOpen(true);
// //           }
// //       } catch (error) {
// //           console.error('채팅 시작 오류:', error);
// //       }
// //   };
  
// //   const sendMessage = async () => {
// //     if (!messageInput.trim()) return;
    
// //     const token = localStorage.getItem('token');
    
// //     try {
// //         const response = await axios.post(
// //             `http://localhost:8080/chat/${roomId}/message`,
// //             messageInput,
// //             {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`,
// //                     'Content-Type': 'text/plain',  // Since the backend expects a raw string in the body
// //                 },
// //             }
// //         );

// //         // Add the sent message to the local message state for instant feedback
// //         setMessages((prevMessages) => [
// //             ...prevMessages,
// //             { senderName: 'You', content: messageInput }
// //         ]);

// //         // Clear the input field after sending the message
// //         setMessageInput('');
// //     } catch (error) {
// //         console.error('메시지 전송 중 오류 발생:', error);
// //     }
// // };

  

// //     const handleCloseChat = () => {
// //         setIsChatOpen(false);
// //     };

// //     useEffect(() => {
// //         return () => {
// //             if (webSocket) {
// //                 webSocket.close();
// //             }
// //         };
// //     }, [webSocket]);

// //     if (loading) {
// //         return <div>로딩 중...</div>;
// //     }

// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     if (!product) {
// //         return <div>상품을 찾을 수 없습니다.</div>;
// //     }

// //     return (
// //         <div className={styles.productDetail}>
// //             <div className={styles.productInfo}>
// //                 <div className={styles.productImage}>
// //                     <img src={`http://localhost:8080${product.imgUrl}`} alt={product.title} />
// //                 </div>
// //                 <h2>{product.title}</h2>
// //                 <p>{product.description}</p>
// //                 <p>좋아요: {likes}</p>
// //                 <button onClick={handleLike}>{liked ? '찜 취소' : '찜하기'}</button>
// //                 <button onClick={handleOpenChat}>채팅하기</button>
// //             </div>
// //             {isChatOpen && (
// //                 <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
// //                     <Chat
// //                         roomId={roomId}
// //                         messages={messages}
// //                         messageInput={messageInput}
// //                         setMessageInput={setMessageInput}
// //                         sendMessage={sendMessage}
// //                     />
// //                 </Modal>
// //             )}
// //         </div>
// //     );
// // };

// // export default ProductDetail;




























// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from 'axios';
// import styles from "../../styles/product/ProductDetail.module.css";
// import Chat from '../../pages/MyPage/Chat'; // Chat 컴포넌트
// import Modal from '../chat/Modal'; // Modal 컴포넌트

// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [likes, setLikes] = useState(0);
//   const [liked, setLiked] = useState(false);
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [memberId, setMemberId] = useState(null);
//   const [roomId, setRoomId] = useState(null);
//   const [webSocket, setWebSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState('');

//   // 상품 정보 및 회원 정보 가져오기
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
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchMemberInfo = async () => {
//       const token = localStorage.getItem('token');
      
//       // 로컬 스토리지에서 memberId를 확인
//       const storedMemberId = localStorage.getItem('memberId');
      
//       if (storedMemberId) {
//         setMemberId(storedMemberId); // 이미 로컬 스토리지에 memberId가 있으면 설정
//         console.log("Member ID found in localStorage:", storedMemberId);
//       } else {
//         // 로컬 스토리지에 memberId가 없는 경우, 서버에서 가져옴
//         try {
//           const response = await axios.get(`http://localhost:8080/members/myInfo`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const memberData = response.data;
//           setMemberId(memberData.id);
          
//           // 가져온 memberId를 로컬 스토리지에 저장
//           localStorage.setItem('memberId', memberData.id);
//           console.log("Member ID fetched and saved to localStorage:", memberData.id);
//         } catch (error) {
//           console.error('Error fetching member info:', error);
//         }
//       }
//     };
  
//     fetchProduct();
//     fetchMemberInfo();
//   }, [id]);

//   const handleLike = async () => {
//     if (!memberId) {
//       console.error('Member ID is not available. Cannot proceed with the request.');
//       return;
//     }

//     const token = localStorage.getItem('token');
//     const itemId = product.id;

//     try {
//       await axios.post(
//         'http://localhost:8080/wishlist/add',
//         null,
//         {
//           params: { memberId, itemId },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setLiked(!liked);
//       setLikes(liked ? likes - 1 : likes + 1);
//     } catch (error) {
//       if (error.response) {
//         console.error('Error response:', error.response);
//       } else {
//         console.error('Error:', error.message);
//       }
//     }
//   };

//   const handleOpenChat = async () => {
//     if (!memberId) {
//       console.error('Member ID is not available.');
//       return;
//     }
  
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/item/${id}/chat`,
//         null,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const chatRoomData = response.data;
  
//       if (chatRoomData && chatRoomData.roomId) {
//         setRoomId(chatRoomData.roomId);
//         console.log('Chat Room ID:', chatRoomData.roomId);
        
//         // Fetch previous chat messages
//         const messageResponse = await axios.get(
//           `http://localhost:8080/chat/${chatRoomData.roomId}/messages`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setMessages(messageResponse.data);

//         const socket = new WebSocket(`ws://localhost:8080/ws/${chatRoomData.roomId}/${memberId}?token=${token}`);
//         socket.onopen = () => {
//           console.log('웹소켓 연결 성공');
//         };
//         socket.onmessage = (event) => {
//           const incomingMessage = JSON.parse(event.data);
//           setMessages((prevMessages) => [...prevMessages, incomingMessage]);
//         };
//         socket.onclose = () => {
//           console.log('웹소켓 연결 종료');
//         };
//         setWebSocket(socket);
//         setIsChatOpen(true);
//       } else {
//         console.error('Chat Room ID is missing in the response');
//       }
//     } catch (error) {
//       console.error('Error starting chat:', error);
//       if (error.response) {
//         console.error('Error response:', error.response.data);
//       }
//     }
//   };

//   const handleCloseChat = () => {
//     setIsChatOpen(false);
//     if (webSocket) {
//       webSocket.close();
//     }
//   };

//   const sendMessage = async () => {
//     if (!messageInput.trim()) return;
  
//     const messageData = {
//       roomId,
//       memberId,
//       content: messageInput.trim(),
//     };
  
//     console.log("Sending message:", messageInput); // Debugging line
//     console.log("Message Data:", messageData); // Debugging line
  
//     webSocket.send(JSON.stringify(messageData));
//     setMessageInput('');
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

//       {/* Additional Sections */}
//       <div className={styles.productDetailsContainer}>
//         <div className={styles.productDescription}>
//           <h2 className={styles.sectionTitle}>상품 정보</h2>
//           <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
//         </div>
//         <div className={styles.storeProfileWrapper}>
//           <h2 className={styles.sectionTitle}>판매자 상점</h2>
//           <div className={styles.storeProfile}>
//             <div className={styles.profileInfo}>
//               <Link to={`/Seller-Profile/${product.sellerNickname}`} className={styles.profilePic}>
//                 <i className={`${styles.icon} fas fa-store`}></i>
//               </Link>
//               <div className={styles.storeName}>{product.sellerNickname || '판매자 닉네임'}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.relatedProducts}>
//         <h2 className={styles.sectionTitle}>연관 상품</h2>
//         <div className={styles.relatedProductList}>
//           {product.relatedProducts && product.relatedProducts.length > 0 ? (
//             product.relatedProducts.map((relatedProduct) => (
//               <div key={relatedProduct.id} className={styles.relatedProduct}>
//                 <img src={relatedProduct.image} alt={relatedProduct.title} />
//                 <p>{relatedProduct.title}</p>
//                 <span>{relatedProduct.price} 원</span>
//               </div>
//             ))
//           ) : (
//             <p>연관 상품이 없습니다.</p>
//           )}
//         </div>
//       </div>

//       <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
//         <Chat roomId={roomId} memberId={memberId} messages={messages} sendMessage={sendMessage} messageInput={messageInput} setMessageInput={setMessageInput} />
//       </Modal>
//     </div>
//   );
// };

// export default ProductDetail;


















import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import styles from "../../styles/product/ProductDetail.module.css";
import Chat from '../../pages/MyPage/Chat'; // Chat 컴포넌트
import Modal from '../chat/Modal'; // Modal 컴포넌트

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

  // 상품 정보 및 회원 정보 가져오기
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
      
      // 로컬 스토리지에서 memberId를 확인
      const storedMemberId = localStorage.getItem('memberId');
      
      if (storedMemberId) {
        setMemberId(storedMemberId); // 이미 로컬 스토리지에 memberId가 있으면 설정
        console.log("Member ID found in localStorage:", storedMemberId);
      } else {
        // 로컬 스토리지에 memberId가 없는 경우, 서버에서 가져옴
        try {
          const response = await axios.get(`http://localhost:8080/members/myInfo`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const memberData = response.data;
          setMemberId(memberData.id);
          
          // 가져온 memberId를 로컬 스토리지에 저장
          localStorage.setItem('memberId', memberData.id);
          console.log("Member ID fetched and saved to localStorage:", memberData.id);
        } catch (error) {
          console.error('Error fetching member info:', error);
        }
      }
    };
  
    fetchProduct();
    fetchMemberInfo();
  }, [id]);
  

  // 좋아요 핸들러
  const handleLike = async () => {
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

  // 채팅 시작 핸들러
  const handleOpenChat = async () => {
    if (!memberId) {
      console.error('Member ID is not available.');
      return;
    }
  
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:8080/item/${id}/chat`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const chatRoomData = response.data;
  
      if (chatRoomData && chatRoomData.roomId) {
        setRoomId(chatRoomData.roomId);
        
        // 이전 메시지 가져오기
        const messageResponse = await axios.get(
          `http://localhost:8080/chat/${chatRoomData.roomId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(messageResponse.data);

        // WebSocket 연결
        const socket = new WebSocket(`ws://localhost:8080/ws/${chatRoomData.roomId}/${memberId}?token=${token}`);
        socket.onopen = () => {
          console.log('웹소켓 연결 성공');
        };
        socket.onmessage = (event) => {
          const incomingMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, incomingMessage]);
        };
        socket.onclose = () => {
          console.log('웹소켓 연결 종료');
        };
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

  // 메시지 전송
  const sendMessage = async () => {
    if (!messageInput.trim()) return;

    const messageData = {
      roomId,
      memberId,
      content: messageInput.trim(),
    };
  
    webSocket.send(JSON.stringify(messageData));
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

      {/* Additional Sections */}
      <div className={styles.productDetailsContainer}>
        <div className={styles.productDescription}>
          <h2 className={styles.sectionTitle}>상품 정보</h2>
          <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
        </div>
        <div className={styles.storeProfileWrapper}>
          <h2 className={styles.sectionTitle}>판매자 상점</h2>
          <div className={styles.storeProfile}>
            <div className={styles.profileInfo}>
              <Link to={`/Seller-Profile/${product.sellerNickname}`} className={styles.profilePic}>
                <i className={`${styles.icon} fas fa-store`}></i>
              </Link>
              <div className={styles.storeName}>{product.sellerNickname || '판매자 닉네임'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.relatedProducts}>
        <h2 className={styles.sectionTitle}>연관 상품</h2>
        <div className={styles.relatedProductList}>
          {product.relatedProducts && product.relatedProducts.length > 0 ? (
            product.relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className={styles.relatedProduct}>
                <img src={relatedProduct.image} alt={relatedProduct.title} />
                <p>{relatedProduct.title}</p>
                <span>{relatedProduct.price} 원</span>
              </div>
            ))
          ) : (
            <p>연관 상품이 없습니다.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
        <Chat roomId={roomId} memberId={memberId} messages={messages} sendMessage={sendMessage} messageInput={messageInput} setMessageInput={setMessageInput} />
      </Modal>
    </div>
  );
};

export default ProductDetail;

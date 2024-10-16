// // // // // //   import React, { useState, useEffect } from "react"; 
// // // // // // import { useParams } from "react-router-dom";
// // // // // // import axios from 'axios';
// // // // // // import styles from "../../styles/product/ProductDetail.module.css";
// // // // // // import Chat from '../../pages/MyPage/Chat';
// // // // // // import Modal from '../chat/Modal';

// // // // // // const ProductDetail = () => {
// // // // // //   const { id } = useParams();
// // // // // //   const [product, setProduct] = useState(null);
// // // // // //   const [likes, setLikes] = useState(0);
// // // // // //   const [liked, setLiked] = useState(false);
// // // // // //   const [isChatOpen, setIsChatOpen] = useState(false);
// // // // // //   const [loading, setLoading] = useState(true);
// // // // // //   const [error, setError] = useState(null);
// // // // // //   const [memberId, setMemberId] = useState(null);

// // // // // //   useEffect(() => {
// // // // // //     const fetchProduct = async () => {
// // // // // //       const token = localStorage.getItem('token');
// // // // // //       try {
// // // // // //         const response = await axios.get(`http://localhost:8080/item/${id}`, {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //           },
// // // // // //         });

// // // // // //         const productData = response.data;
// // // // // //         const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;

// // // // // //         setProduct({ ...productData, imgUrl: mainImage });
// // // // // //         setLikes(productData.likes || 0);
// // // // // //         setLiked(productData.liked || false);
// // // // // //       } catch (error) {
// // // // // //         if (error.response && error.response.status === 401) {
// // // // // //           setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
// // // // // //         } else {
// // // // // //           setError('상품을 불러오는 중 오류가 발생했습니다.');
// // // // // //         }
// // // // // //       } finally {
// // // // // //         setLoading(false);
// // // // // //       }
// // // // // //     };

// // // // // //     const fetchMemberInfo = async () => {
// // // // // //       const token = localStorage.getItem('token');
// // // // // //       try {
// // // // // //         const response = await axios.get(`http://localhost:8080/members/myInfo`, {
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //           },
// // // // // //         });
// // // // // //         const memberData = response.data;
// // // // // //         setMemberId(memberData.id);
// // // // // //       } catch (error) {
// // // // // //         console.error('Error fetching member info:', error);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchProduct();
// // // // // //     fetchMemberInfo();
// // // // // //   }, [id]);

// // // // // //   const handleLike = async () => {
// // // // // //     if (!memberId) {
// // // // // //       console.error('Member ID is not available. Cannot proceed with the request.');
// // // // // //       return;
// // // // // //     }
  
// // // // // //     const token = localStorage.getItem('token');
// // // // // //     const itemId = product.id;
  
// // // // // //     try {
// // // // // //       await axios.post(
// // // // // //         'http://localhost:8080/wishlist/add',
// // // // // //         null,
// // // // // //         {
// // // // // //           params: { memberId, itemId },
// // // // // //           headers: {
// // // // // //             Authorization: `Bearer ${token}`,
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       setLiked(!liked);
// // // // // //       setLikes(liked ? likes - 1 : likes + 1);
// // // // // //     } catch (error) {
// // // // // //       if (error.response) {
// // // // // //         console.error('Error response:', error.response);
// // // // // //       } else {
// // // // // //         console.error('Error:', error.message);
// // // // // //       }
// // // // // //     }
// // // // // //   };

// // // // // //   const handleOpenChat = () => {
// // // // // //     setIsChatOpen(true);
// // // // // //   };

// // // // // //   const handleCloseChat = () => {
// // // // // //     setIsChatOpen(false);
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return <div>Loading...</div>;
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return <div>{error}</div>;
// // // // // //   }

// // // // // //   if (!product) {
// // // // // //     return <div>상품을 찾을 수 없습니다.</div>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className={styles.productDetail}>
// // // // // //       <div className={styles.productInfo}>
// // // // // //         <div className={styles.productImage}>
// // // // // //           <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} />
// // // // // //         </div>
// // // // // //         <div className={styles.productContent}>
// // // // // //           <h1>{product.itemNm}</h1>
// // // // // //           <div className={styles.productPrice}>{product.price} 원</div>
// // // // // //           <div className={styles.productStats}>
// // // // // //             <span>{liked ? '❤️' : '🤍'} {likes}</span>
// // // // // //             <span>조회수 {product.views || 0}</span>
// // // // // //             <span>등록시간 {new Date(product.regTime).toLocaleString()}</span>
// // // // // //           </div>
// // // // // //           <div className={styles.actionButtons}>
// // // // // //             <button className={styles.likeButton} onClick={handleLike}>
// // // // // //               {liked ? '찜 취소' : '찜하기'}
// // // // // //             </button>
// // // // // //             <button className={styles.chatButton} onClick={handleOpenChat}>채팅하기</button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //       <div className={styles.productDescription}>
// // // // // //         <h2>상품정보</h2>
// // // // // //         <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
// // // // // //       </div>
// // // // // //       <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
// // // // // //         <Chat />
// // // // // //       </Modal>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default ProductDetail;

























// // // // import React, { useState, useEffect } from "react"; 
// // // // import { useParams } from "react-router-dom";
// // // // import axios from 'axios';
// // // // import styles from "../../styles/product/ProductDetail.module.css";
// // // // import Chat from '../../pages/MyPage/Chat';
// // // // import Modal from '../chat/Modal';

// // // // const ProductDetail = () => {
// // // //   const { id } = useParams();
// // // //   const [product, setProduct] = useState(null);
// // // //   const [likes, setLikes] = useState(0);
// // // //   const [liked, setLiked] = useState(false);
// // // //   const [isChatOpen, setIsChatOpen] = useState(false);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [memberId, setMemberId] = useState(null);
// // // //   const [chatRoomId, setChatRoomId] = useState(null); // Added for managing chat room ID

// // // //   useEffect(() => {
// // // //     const fetchProduct = async () => {
// // // //       const token = localStorage.getItem('token');
// // // //       try {
// // // //         const response = await axios.get(`http://localhost:8080/item/${id}`, {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         });

// // // //         const productData = response.data;
// // // //         const mainImage = productData.itemImgDtoList.length > 0 ? productData.itemImgDtoList[0].imgUrl : null;

// // // //         setProduct({ ...productData, imgUrl: mainImage });
// // // //         setLikes(productData.likes || 0);
// // // //         setLiked(productData.liked || false);
// // // //       } catch (error) {
// // // //         if (error.response && error.response.status === 401) {
// // // //           setError('인증에 실패했습니다. 로그인 후 다시 시도해주세요.');
// // // //         } else {
// // // //           setError('상품을 불러오는 중 오류가 발생했습니다.');
// // // //         }
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     const fetchMemberInfo = async () => {
// // // //       const token = localStorage.getItem('token');
// // // //       try {
// // // //         const response = await axios.get(`http://localhost:8080/members/myInfo`, {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         });
// // // //         const memberData = response.data;
// // // //         setMemberId(memberData.id);
// // // //       } catch (error) {
// // // //         console.error('Error fetching member info:', error);
// // // //       }
// // // //     };

// // // //     fetchProduct();
// // // //     fetchMemberInfo();
// // // //   }, [id]);

// // // //   const handleLike = async () => {
// // // //     if (!memberId) {
// // // //       console.error('Member ID is not available. Cannot proceed with the request.');
// // // //       return;
// // // //     }
  
// // // //     const token = localStorage.getItem('token');
// // // //     const itemId = product.id;
  
// // // //     try {
// // // //       await axios.post(
// // // //         'http://localhost:8080/wishlist/add',
// // // //         null,
// // // //         {
// // // //           params: { memberId, itemId },
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         }
// // // //       );

// // // //       setLiked(!liked);
// // // //       setLikes(liked ? likes - 1 : likes + 1);
// // // //     } catch (error) {
// // // //       if (error.response) {
// // // //         console.error('Error response:', error.response);
// // // //       } else {
// // // //         console.error('Error:', error.message);
// // // //       }
// // // //     }
// // // //   };

// // // //   const handleOpenChat = async () => {
// // // //     if (!memberId) {
// // // //       console.error('Member ID is not available. Cannot proceed with chat.');
// // // //       return;
// // // //     }

// // // //     const token = localStorage.getItem('token');
// // // //     try {
// // // //       const response = await axios.post(
// // // //         `http://localhost:8080/item/${id}/chat`,
// // // //         null,
// // // //         {
// // // //           headers: {
// // // //             Authorization: `Bearer ${token}`,
// // // //           },
// // // //         }
// // // //       );
// // // //       const chatRoomData = response.data;
// // // //       setChatRoomId(chatRoomData.id); // Store chat room ID
// // // //       setIsChatOpen(true); // Open the chat modal
// // // //     } catch (error) {
// // // //       console.error('Error starting chat:', error);
// // // //     }
// // // //   };
  

// // // //   const handleCloseChat = () => {
// // // //     setIsChatOpen(false);
// // // //   };

// // // //   if (loading) {
// // // //     return <div>Loading...</div>;
// // // //   }

// // // //   if (error) {
// // // //     return <div>{error}</div>;
// // // //   }

// // // //   if (!product) {
// // // //     return <div>상품을 찾을 수 없습니다.</div>;
// // // //   }

// // // //   return (
// // // //     <div className={styles.productDetail}>
// // // //       <div className={styles.productInfo}>
// // // //         <div className={styles.productImage}>
// // // //           <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} />
// // // //         </div>
// // // //         <div className={styles.productContent}>
// // // //           <h1>{product.itemNm}</h1>
// // // //           <div className={styles.productPrice}>{product.price} 원</div>
// // // //           <div className={styles.productStats}>
// // // //             <span>{liked ? '❤️' : '🤍'} {likes}</span>
// // // //             <span>조회수 {product.views || 0}</span>
// // // //             <span>등록시간 {new Date(product.regTime).toLocaleString()}</span>
// // // //           </div>
// // // //           <div className={styles.actionButtons}>
// // // //             <button className={styles.likeButton} onClick={handleLike}>
// // // //               {liked ? '찜 취소' : '찜하기'}
// // // //             </button>
// // // //             <button className={styles.chatButton} onClick={handleOpenChat}>채팅하기</button>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <div className={styles.productDescription}>
// // // //         <h2>상품정보</h2>
// // // //         <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
// // // //       </div>
// // // //       <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
// // // //         <Chat chatRoomId={chatRoomId} memberId={memberId} /> Pass chat room ID and member ID to Chat component
// // // //       </Modal>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProductDetail;




















// // // 종민
// // import React, { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";
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
// //   const [chatRoomId, setChatRoomId] = useState(null); // For managing chat room ID

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
// //         `http://localhost:8080/item/${id}/chat`,
// //         null,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       const chatRoomData = response.data;
// //       setChatRoomId(chatRoomData.id); // Store chat room ID
// //       setIsChatOpen(true); // Open the chat modal
// //     } catch (error) {
// //       console.error('Error starting chat:', error);
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
// //         <div className={styles.productImageSection}>
// //           <div className={styles.productImage}>
// //             <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} />
// //           </div>
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
// //       <div className={styles.productDescription}>
// //         <h2>상품정보</h2>
// //         <p>{product.itemDetail || '상세 설명이 없습니다.'}</p>
// //       </div>

// //       <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
// //         <Chat chatRoomId={chatRoomId} memberId={memberId} />
// //       </Modal>

      
// //     </div>

// //   );
// // };

// // export default ProductDetail;





















// import React, { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useParams, Link } from "react-router-dom";
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
//   const [memberId, setMemberId] = useState(null);
//   const [roomId, setRoomId] = useState(null);
  
 
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
//       try {
//         const response = await axios.get(`http://localhost:8080/members/myInfo`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const memberData = response.data;
//         setMemberId(memberData.id);
//       } catch (error) {
//         console.error('Error fetching member info:', error);
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
//       console.error('Member ID is not available. Cannot proceed with chat.');
//       return;
//     }
  
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post(
//         //채팅 시작
//         `http://localhost:8080/item/${id}/chat`,
//         null,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
  
//       // Log the entire response data for debugging
//       console.log('Chat Room Response:', response.data);
  
//       const chatRoomData = response.data;
  
//       // Access roomId from chatRoomData
//       if (chatRoomData && chatRoomData.roomId) {
//         setRoomId(chatRoomData.roomId); // Update to use roomId instead of id
//         console.log('Chat Room ID:', chatRoomData.roomId); // Debugging
//         setIsChatOpen(true);
//       } else {
//         console.error('Chat Room ID is missing in the response');
//       }
//     } catch (error) {
//       console.error('Error starting chat:', error);
//       if (error.response) {
//         console.error('Error response:', error.response.data); // More detailed error logging
//       }
//     }
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

//       {/* <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
//         <Chat roomId={roomId} memberId={memberId} />
//       </Modal> */}
      
//     </div>
//   );
// };

// export default ProductDetail;




















import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
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
  const [roomId, setRoomId] = useState(null);
  
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

  const handleOpenChat = async () => {
    if (!memberId) {
      console.error('Member ID is not available. Cannot proceed with chat.');
      return;
    }
  
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        // 채팅 시작
        `http://localhost:8080/item/${id}/chat`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the entire response data for debugging
      console.log('Chat Room Response:', response.data);
  
      const chatRoomData = response.data;
  
      // Access roomId from chatRoomData
      if (chatRoomData && chatRoomData.roomId) {
        setRoomId(chatRoomData.roomId); // Update to use roomId instead of id
        console.log('Chat Room ID:', chatRoomData.roomId); // Debugging
        setIsChatOpen(true);
      } else {
        console.error('Chat Room ID is missing in the response');
      }
    } catch (error) {
      console.error('Error starting chat:', error);
      if (error.response) {
        console.error('Error response:', error.response.data); // More detailed error logging
      }
    }
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

      {/* Chat Component */}
      {/* {isChatOpen && (
        <div className={styles.chatContainer}>
          <Chat roomId={roomId}  onClose={handleCloseChat} />
        </div>
      )} */}

       <Modal isOpen={isChatOpen} onClose={handleCloseChat}>
        <Chat roomId={roomId} memberId={memberId} />
      </Modal>
      
    </div>
  );
};

export default ProductDetail;

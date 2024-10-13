// import React, { useState, useEffect } from 'react';
// import styles from '../../styles/MyPage/Like.module.css';

// const Like = () => {
//     const [likedProducts, setLikedProducts] = useState([]);

//     useEffect(() => {
//         // 로컬 스토리지에서 찜한 상품 목록 가져오기
//         const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
//         setLikedProducts(storedLikedProducts);
//     }, []);

//     // 상품 삭제 함수
//     const handleDeleteProduct = (productId) => {
//         // 삭제할 상품을 제외한 새로운 목록 생성
//         const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
//         setLikedProducts(updatedLikedProducts);

//         // 로컬 스토리지에 새로운 목록 저장
//         localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));

//         // 삭제된 상품의 찜 상태를 업데이트
//         const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//         const updatedProducts = storedProducts.map(product =>
//             product.id === productId ? { ...product, liked: false, likes: product.likes - 1 } : product
//         );
//         localStorage.setItem('products', JSON.stringify(updatedProducts));
//     };

//     return (
//         <div className={styles.like}>
//             <h2>찜한 상품</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>상품</th>
//                         <th>가격</th>
//                         <th>삭제</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {likedProducts.length > 0 ? (
//                         likedProducts.map(product => (
//                             <tr key={product.id}>
//                                 <td>
//                                     <div className={styles.likeProductInfo}>
//                                         <img src={product.imageUrl} alt={product.name} className={styles.likeProductImage} />
//                                         <span className={styles.likeProductName}>{product.name}</span>
//                                     </div>
//                                 </td>
//                                 <td>{product.price}</td>
//                                 <td>
//                                     <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
//                                 </td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="3">찜한 상품이 없습니다.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Like;
















// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import styles from '../../styles/MyPage/Like.module.css';

// // const Like = () => {
// //     const [likedProducts, setLikedProducts] = useState([]); // State for liked products
// //     const [error, setError] = useState(null); // To handle any errors
// //     const [loading, setLoading] = useState(true); // Loading state
// //     const [memberId, setMemberId] = useState(null); // State to store member ID

// //     useEffect(() => {
// //         const fetchLikedProducts = async () => {
// //             const token = localStorage.getItem('token'); // Retrieve the JWT token

// //             console.log('Token:', token);
// //             console.log('Member ID:', memberId);
// //             console.log('Item ID:', itemId);

// //             // Check if token is undefined or null
// //             if (!token) {
// //                 setError('인증 정보가 없습니다. 로그인 후 다시 시도해주세요.');
// //                 setLoading(false);
// //                 return;
// //             }

// //             try {
// //                 // Fetch member info to get the memberId
// //                 const memberResponse = await axios.get('http://localhost:8080/members/myInfo', {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 });

// //                 const memberData = memberResponse.data;
// //                 setMemberId(memberData.id); // Assuming memberData has an 'id' property

// //                 // Fetch liked products using the fetched memberId
// //                 const response = await axios.get(`http://localhost:8080/wishlist/user/${memberData.id}`, {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 });

// //                 const wishlistData = response.data.data; // Assuming the API returns liked products in the 'data' field
// //                 console.log('Fetched liked products:', wishlistData); // Log the fetched data

// //                 // Check if wishlistData is an array and set the state
// //                 if (Array.isArray(wishlistData)) {
// //                     setLikedProducts(wishlistData);
// //                 } else {
// //                     setError('찜한 상품이 없습니다.');
// //                 }
// //             } catch (error) {
// //                 setError('찜한 상품을 불러오는 중 오류가 발생했습니다.');
// //                 console.error('Error fetching liked products:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchLikedProducts(); // Fetch liked products when the component mounts
// //     }, []);

// //     // 상품 삭제 함수
// //     const handleDeleteProduct = async (productId) => {
// //         const token = localStorage.getItem('token');

// //         // Check if token is undefined or null
// //         if (!token || !memberId) {
// //             setError('인증 정보가 없습니다. 로그인 후 다시 시도해주세요.');
// //             return;
// //         }

// //         try {
// //             // Send a request to remove the product from the wishlist
// //             await axios.post(
// //                 'http://localhost:8080/wishlist/add',
// //                 null, // No need for request body
// //                 {
// //                     params: { memberId, itemId: productId },
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 }
// //             );

// //             // Remove the product from the liked products list in the state
// //             const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
// //             setLikedProducts(updatedLikedProducts);
// //         } catch (error) {
// //             console.error('Error removing product from wishlist:', error);
// //             setError('찜 목록에서 상품을 삭제하는 중 오류가 발생했습니다.');
// //         }
// //     };

// //     if (loading) {
// //         return <div>로딩 중...</div>;
// //     }

// //     if (error) {
// //         return <div>{error}</div>;
// //     }

// //     return (
// //         <div className={styles.like}>
// //             <h2>찜한 상품</h2>
// //             <table>
// //                 <thead>
// //                     <tr>
// //                         <th>상품</th>
// //                         <th>가격</th>
// //                         <th>삭제</th>
// //                     </tr>
// //                 </thead>
// //                 <tbody>
// //                     {likedProducts.length > 0 ? (
// //                         likedProducts.map(product => (
// //                             <tr key={product.id}>
// //                                 <td>
// //                                     <div className={styles.likeProductInfo}>
// //                                         <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} className={styles.likeProductImage} />
// //                                         <span>{product.itemNm}</span> {/* Display product name */}
// //                                     </div>
// //                                 </td>
// //                                 <td>{product.price} 원</td>
// //                                 <td>
// //                                     <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
// //                                 </td>
// //                             </tr>
// //                         ))
// //                     ) : (
// //                         <tr>
// //                             <td colSpan="3">찜한 상품이 없습니다.</td>
// //                         </tr>
// //                     )}
// //                 </tbody>
// //             </table>
// //         </div>
// //     );
// // };

// // export default Like;


















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import styles from '../../styles/MyPage/Like.module.css';

// const Like = () => {
//   const [likedProducts, setLikedProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [memberId, setMemberId] = useState(null);

//   useEffect(() => {
    
//     const fetchLikedProducts = async () => {
    
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('인증 정보가 없습니다. 로그인 후 다시 시도해주세요.');
//         setLoading(false);
//         return;
//       }

//       try {
//         const memberResponse = await axios.get('http://localhost:8080/members/myInfo', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const memberData = memberResponse.data;
//         setMemberId(memberData.id);

//         const response = await axios.get(`http://localhost:8080/wishlist/user/${memberData.id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // console.log(response.data);
//         // console.log(wishlistData);
//         const wishlistData = response.data.data;
//         if (Array.isArray(wishlistData)) {
//           setLikedProducts(wishlistData);
//         } else {
//           setError('찜한 상품이 없습니다.');
//         }
//       } catch (error) {
//         setError('찜한 상품을 불러오는 중 오류가 발생했습니다.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLikedProducts();
//   }, []);

//   const handleDeleteProduct = async (productId) => {
//     const token = localStorage.getItem('token');
    
//     if (!token || !memberId) {
//       setError('인증 정보가 없습니다. 로그인 후 다시 시도해주세요.');
//       return;
//     }

//     try {
//       await axios.post(
//         'http://localhost:8080/wishlist/add',
//         null,
//         {
//           params: { memberId, itemId: productId },
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
      
//       const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
//       setLikedProducts(updatedLikedProducts);
//     } catch (error) {
//       setError('찜 목록에서 상품을 삭제하는 중 오류가 발생했습니다.');
//     }
//   };

//   if (loading) {
//     return <div>로딩 중...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className={styles.like}>
//       <h2>찜한 상품</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>상품</th>
//             <th>가격</th>
//             <th>삭제</th>
//           </tr>
//         </thead>
//         <tbody>
//           {likedProducts.length > 0 ? (
//             likedProducts.map(product => (
//               <tr key={product.id}>
//                 <td>
//                   <div className={styles.likeProductInfo}>
//                     <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} className={styles.likeProductImage} />
//                     <span>{product.itemNm}</span>
//                   </div>
//                 </td>
//                 <td>{product.price} 원</td>
//                 <td>
//                   <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="3">찜한 상품이 없습니다.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Like;




















import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../styles/MyPage/Like.module.css';

const Like = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    const fetchLikedProducts = async () => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        setError('인증 정보가 없습니다. 로그인 후 다시 시도해주세요.');
        setLoading(false);
        return;
      }
  
      try {
        const memberResponse = await axios.get('http://localhost:8080/members/myInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const memberData = memberResponse.data;
        const memberId = memberData.id;  // Set memberId here
  
        console.log("Member ID:", memberId);  // Log the memberId
  
        const response = await axios.get(`http://localhost:8080/wishlist/user/${memberId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const wishlistData = response.data.data;
        if (Array.isArray(wishlistData)) {
          setLikedProducts(wishlistData);
        } else {
          setError('찜한 상품이 없습니다.');
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error.response ? error.response.data : error.message);
        setError('찜한 상품을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchLikedProducts();
  }, []);
  
  

  const handleDeleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    
    if (!token || !memberId) {
      setError('인증 정보가 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/wishlist/add',
        null,
        {
          params: { memberId, itemId: productId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedLikedProducts = likedProducts.filter(product => product.item.id !== productId);
      setLikedProducts(updatedLikedProducts);
    } catch (error) {
      setError('찜 목록에서 상품을 삭제하는 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.like}>
      <h2>찜한 상품</h2>
      <table>
        <thead>
          <tr>
            <th>상품</th>
            <th>가격</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {likedProducts.length > 0 ? (
            likedProducts.map(product => (
              <tr key={product.item.id}>
                <td>
                  <div className={styles.likeProductInfo}>
                    <img src={`http://localhost:8080${product.item.productThumbnails[0]?.imgUrl}`} alt={product.item.itemNm} className={styles.likeProductImage} />
                    <span>{product.item.itemNm}</span>
                  </div>
                </td>
                <td>{product.item.price} 원</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product.item.id)}>삭제</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">찜한 상품이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Like;

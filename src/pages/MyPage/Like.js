// // // import React, { useState, useEffect } from 'react';
// // // import styles from '../../styles/MyPage/Like.module.css';

// // // const Like = () => {
// // //     const [likedProducts, setLikedProducts] = useState([]);

// // //     useEffect(() => {
// // //         // 로컬 스토리지에서 찜한 상품 목록 가져오기
// // //         const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
// // //         setLikedProducts(storedLikedProducts);
// // //     }, []);

// // //     // 상품 삭제 함수
// // //     const handleDeleteProduct = (productId) => {
// // //         // 삭제할 상품을 제외한 새로운 목록 생성
// // //         const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
// // //         setLikedProducts(updatedLikedProducts);

// // //         // 로컬 스토리지에 새로운 목록 저장
// // //         localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));

// // //         // 삭제된 상품의 찜 상태를 업데이트
// // //         const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
// // //         const updatedProducts = storedProducts.map(product =>
// // //             product.id === productId ? { ...product, liked: false, likes: product.likes - 1 } : product
// // //         );
// // //         localStorage.setItem('products', JSON.stringify(updatedProducts));
// // //     };

// // //     return (
// // //         <div className={styles.like}>
// // //             <h2>찜한 상품</h2>
// // //             <table>
// // //                 <thead>
// // //                     <tr>
// // //                         <th>상품</th>
// // //                         <th>가격</th>
// // //                         <th>삭제</th>
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                     {likedProducts.length > 0 ? (
// // //                         likedProducts.map(product => (
// // //                             <tr key={product.id}>
// // //                                 <td>
// // //                                     <div className={styles.likeProductInfo}>
// // //                                         <img src={product.imageUrl} alt={product.name} className={styles.likeProductImage} />
// // //                                         <span className={styles.likeProductName}>{product.name}</span>
// // //                                     </div>
// // //                                 </td>
// // //                                 <td>{product.price}</td>
// // //                                 <td>
// // //                                     <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
// // //                                 </td>
// // //                             </tr>
// // //                         ))
// // //                     ) : (
// // //                         <tr>
// // //                             <td colSpan="3">찜한 상품이 없습니다.</td>
// // //                         </tr>
// // //                     )}
// // //                 </tbody>
// // //             </table>
// // //         </div>
// // //     );
// // // };

// // // export default Like;




















// // // import React, { useState, useEffect } from 'react';
// // // import axios from 'axios';
// // // import styles from '../../styles/MyPage/Like.module.css';

// // // const Like = () => {
// // //     const [likedProducts, setLikedProducts] = useState([]); // Initialize as an empty array
// // //     const [error, setError] = useState(null);
// // //     const [loading, setLoading] = useState(true);
// // //     const [memberId, setMemberId] = useState(null);

// // //     useEffect(() => {
// // //         const fetchMemberInfo = async () => {
// // //             const token = localStorage.getItem('token');
// // //             try {
// // //                 const response = await axios.get(`http://localhost:8080/members/myInfo`, {
// // //                     headers: {
// // //                         Authorization: `Bearer ${token}`,
// // //                     },
// // //                 });
// // //                 setMemberId(response.data.id); // Set member ID
// // //             } catch (error) {
// // //                 console.error('Error fetching member info:', error);
// // //             }
// // //         };

// // //         fetchMemberInfo();
// // //     }, []);

// // //     const fetchLikedProducts = async (memberId) => {
// // //         const token = localStorage.getItem('token');
// // //         try {
// // //             const response = await axios.get(`http://localhost:8080/wishlist/user`, {
// // //                 headers: {
// // //                     Authorization: `Bearer ${token}`,
// // //                 },
// // //             });
// // //             // Ensure the data is an array before setting it
// // //             setLikedProducts(response.data.data || []); 
// // //         } catch (error) {
// // //             console.error('Error fetching liked products:', error);
// // //             setError('찜 목록을 불러오는 중 오류가 발생했습니다.');
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     };

// // //     useEffect(() => {
// // //         if (memberId) {
// // //             fetchLikedProducts(memberId);
// // //         }
// // //     }, [memberId]);

// // //     // Product delete function
// // //     const handleDeleteProduct = async (productId) => {
// // //         // API call to delete product logic can be added here
// // //         const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
// // //         setLikedProducts(updatedLikedProducts);
// // //     };

// // //     if (loading) {
// // //         return <div>Loading...</div>;
// // //     }

// // //     if (error) {
// // //         return <div>{error}</div>;
// // //     }

// // //     return (
// // //         <div className={styles.like}>
// // //             <h2>찜한 상품</h2>
// // //             <table>
// // //                 <thead>
// // //                     <tr>
// // //                         <th>상품</th>
// // //                         <th>가격</th>
// // //                         <th>삭제</th>
// // //                     </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                     {Array.isArray(likedProducts) && likedProducts.length > 0 ? ( // Check if likedProducts is an array
// // //                         likedProducts.map(product => (
// // //                             <tr key={product.id}>
// // //                                 <td>
// // //                                     <div className={styles.likeProductInfo}>
// // //                                         <img src={`http://localhost:8080${product.imgUrl}`} alt={product.itemNm} className={styles.likeProductImage} />
// // //                                         <span className={styles.likeProductName}>{product.itemNm}</span>
// // //                                     </div>
// // //                                 </td>
// // //                                 <td>{product.price} 원</td>
// // //                                 <td>
// // //                                     <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
// // //                                 </td>
// // //                             </tr>
// // //                         ))
// // //                     ) : (
// // //                         <tr>
// // //                             <td colSpan="3">찜한 상품이 없습니다.</td>
// // //                         </tr>
// // //                     )}
// // //                 </tbody>
// // //             </table>
// // //         </div>
// // //     );
// // // };

// // // export default Like;
































import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/MyPage/Like.module.css';

const Like = () => {
    const [likedProducts, setLikedProducts] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        // Fetch member info and get liked products
        const fetchMemberInfoAndLikedProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found. Please login.');
                return;
            }

            try {
                // Fetch member info
                const memberInfoResponse = await axios.get('http://localhost:8080/members/myInfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const memberData = memberInfoResponse.data;
                setMemberId(memberData.id);

                // Fetch liked products using memberId
                const wishlistResponse = await axios.get(`http://localhost:8080/wishlist/user`, {
                    params: { memberId: memberData.id },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setLikedProducts(wishlistResponse.data.data || []);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access. Please log in.');
                } else {
                    console.error('Error fetching data:', error);
                }
            }
        };

        fetchMemberInfoAndLikedProducts();
    }, []);

    // Delete product from wishlist
    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('token');
        if (!memberId) {
            console.error('Member ID is not available.');
            return;
        }

        try {
            // Remove product from the wishlist
            await axios.post('http://localhost:8080/wishlist/add', null, {
                params: { memberId, itemId: productId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Update the local liked products list
            const updatedLikedProducts = likedProducts.filter(product => product.itemId !== productId);
            setLikedProducts(updatedLikedProducts);
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
        }
    };

    // Handle clicking on the product name to navigate to the product detail page
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); // Navigate to the product detail page with the productId
    };

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
                            <tr key={product.itemId}>
                                <td>
                                    <div className={styles.likeProductInfo}>
                                        <img
                                            src={`http://localhost:8080${product.imgUrl}`}
                                            alt={product.itemName}
                                            className={styles.likeProductImage}
                                        />
                                        <span 
                                            className={styles.likeProductName} 
                                            onClick={() => handleProductClick(product.itemId)} // Navigate on click
                                            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
                                        >
                                            {product.itemName}
                                        </span>
                                    </div>
                                </td>
                                <td>{product.price} 원</td>
                                <td>
                                    <button onClick={() => handleDeleteProduct(product.itemId)}>삭제</button>
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

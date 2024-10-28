import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/MyPage/Like.module.css';

const Like = () => {
    const [likedProducts, setLikedProducts] = useState([]);
    const [memberId, setMemberId] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        
        const fetchMemberInfoAndLikedProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Token not found. Please login.');
                return;
            }

            try {
              
                const memberInfoResponse = await axios.get('http://localhost:8080/members/myInfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const memberData = memberInfoResponse.data;
                setMemberId(memberData.id);

            
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


    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('token');
        if (!memberId) {
            console.error('Member ID is not available.');
            return;
        }

        try {
           
            await axios.post('http://localhost:8080/wishlist/add', null, {
                params: { memberId, itemId: productId },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            
            const updatedLikedProducts = likedProducts.filter(product => product.itemId !== productId);
            setLikedProducts(updatedLikedProducts);
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
        }
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); 
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
                                            onClick={() => handleProductClick(product.itemId)} 
                                            style={{ cursor: 'pointer' }} 
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
































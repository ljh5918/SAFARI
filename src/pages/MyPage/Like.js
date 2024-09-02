import React, { useState, useEffect } from 'react';
import styles from '../../styles/MyPage/Like.module.css';

const Like = () => {
    // 찜한 상품을 담을 상태
    const [likedProducts, setLikedProducts] = useState([]);

    // 컴포넌트가 마운트된 후에 실행되는 useEffect를 사용하여 데이터를 가져옴
    useEffect(() => {
        // 서버로부터 찜한 상품 데이터를 가져오는 API 호출, 데이터를 받아와 상태 업데이트
        // 임시데이터 사용
        const sampleLikedProducts = [
            { id: 1, name: '상품 1', price: '30,000', imageUrl: 'https://via.placeholder.com/150' },
            { id: 2, name: '상품 2', price: '40,000', imageUrl: 'https://via.placeholder.com/150' },
            { id: 3, name: '상품 3', price: '50,000', imageUrl: 'https://via.placeholder.com/150' },
            { id: 4, name: '상품 4', price: '60,000', imageUrl: 'https://via.placeholder.com/150' },
        ];
        
        // 가져온 데이터를 상태에 설정
        setLikedProducts(sampleLikedProducts);
    }, []);

    
    // 상품 삭제 함수
    const handleDeleteProduct = (productId) => {
        // 해당 상품을 제외한 새로운 배열 생성
        const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
        // 새로운 배열로 상태 업데이트
        setLikedProducts(updatedLikedProducts);
    };

    return (
        <div className={styles.like}>
            <h2>찜한상품</h2>
            <table>
                <thead>
                    <tr>
                        <th>상품</th>
                        <th>가격</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {likedProducts.map(product => (
                        <tr key={product.id}>
                            <td>
                                <div className={styles.likeProductInfo}>
                                    <img src={product.imageUrl} alt={product.name} className={styles.likeProductImage} />
                                    <span className={styles.likeProductName}>{product.name}</span>
                                </div>
                            </td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleDeleteProduct(product.id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Like;

import React, { useState, useEffect } from 'react';
import styles from '../../styles/MyPage/Like.module.css';

const Like = () => {
    const [likedProducts, setLikedProducts] = useState([]);

    useEffect(() => {
        // 로컬 스토리지에서 찜한 상품 목록 가져오기
        const storedLikedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
        setLikedProducts(storedLikedProducts);
    }, []);

    // 상품 삭제 함수
    const handleDeleteProduct = (productId) => {
        // 삭제할 상품을 제외한 새로운 목록 생성
        const updatedLikedProducts = likedProducts.filter(product => product.id !== productId);
        setLikedProducts(updatedLikedProducts);

        // 로컬 스토리지에 새로운 목록 저장
        localStorage.setItem('likedProducts', JSON.stringify(updatedLikedProducts));

        // 삭제된 상품의 찜 상태를 업데이트
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = storedProducts.map(product =>
            product.id === productId ? { ...product, liked: false, likes: product.likes - 1 } : product
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
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






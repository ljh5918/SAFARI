import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import styles from '../../styles/MyPage/Products.module.css';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [], // 등록한 상품 데이터 배열
        };
    }

    componentDidMount() {
        /*fetchProductsData().then(products => {
            this.setState({ products });
        }).catch(error => {
            console.error('Error fetching products data:', error);
        });*/
        // 임시 데이터 사용 
        const sampleProductsData = [
            { id: 1, name: '아이폰', price: '50,000', imageUrl: 'https://via.placeholder.com/150' },
            { id: 2, name: '아이패드', price: '60,000', imageUrl: 'https://via.placeholder.com/150' },
            { id: 3, name: '노트북', price: '70,000', imageUrl: 'https://via.placeholder.com/150' },
            { id: 4, name: '신발', price: '80,000', imageUrl: 'https://via.placeholder.com/150' },
        ];

        this.setState({ products: sampleProductsData });
    }

    render() {
        return (
            <div className={styles.Products}>
                <h2>등록한 상품</h2>
                <table>
                    <thead>
                        <tr>
                            <th>상품</th>
                            <th>가격</th>
                            <th>수정</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className={styles.ProductsProductInfo}>
                                        <img src={product.imageUrl} alt={product.name} className={styles.ProductsProductImage} />
                                        <span className={styles.ProductsProductName}>{product.name}</span>
                                    </div>
                                </td>
                                <td>{product.price}</td>
                                <td>
                                    <Link to={`/edit-product/${product.id}`} className={styles.editButton}>수정</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Products;

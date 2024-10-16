import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/MyPage/Products.module.css';

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }
    return ComponentWithRouterProp;
}

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchProducts(); // Fetch products on component mount
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/'); 
            this.setState({ products: response.data.items.reverse(), loading: false });
        } catch (error) {
            console.error("Error fetching products:", error);
            this.setState({ error: "Failed to fetch products", loading: false });
        }
    }

    

    render() {
        const { products, loading, error } = this.state;

        return (
            <div className={styles.Products}>
                <h2>등록한 상품</h2>
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>상품</th>
                                <th>가격</th>
                                {/* <th>수정</th>
                                <th>삭제</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className={styles.ProductsProductInfo}>
                                            <img 
                                                src={`http://localhost:8080${product.imgUrl}`} 
                                                alt={product.itemNm}
                                                className={styles.ProductsProductImage}
                                            />
                                            <span className={styles.ProductsProductName}>{product.itemNm}</span>
                                        </div>
                                    </td>
                                    <td>{product.price} 원</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default withRouter(Products);


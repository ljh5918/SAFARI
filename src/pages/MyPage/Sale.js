import React, { Component } from 'react';
import axios from 'axios';
import styles from '../../styles/MyPage/Sale.module.css';

const calculateElapsedTime = (timestamp) => {
  const now = Date.now();
  const elapsedTime = now - new Date(timestamp).getTime();
  const minutes = Math.floor(elapsedTime / 60000);
  if (minutes < 60) {
    return `${minutes}분 전`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}시간 전`;
  }
  const days = Math.floor(hours / 24);
  return `${days}일 전`;
};

class Sale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sale: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        this.fetchSaleData();
    }

    fetchSaleData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/orders', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            this.setState({
                sale: response.data.orders,
                loading: false,
                error: null,
            });
        } catch (error) {
            this.setState({
                error: "판매 내역을 가져오는 데 실패했습니다.",
                loading: false,
            });
        }
    }

    render() {
        const { sale, loading, error } = this.state;

        return (
            <div className={styles.Products}>
                <h2>판매 내역</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : sale.length === 0 ? (
                    <p>판매 내역이 없습니다.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>상품</th>
                                <th>가격</th>
                                <th>판매일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sale.map(order => (
                                order.orderItemDtoList && order.orderItemDtoList.map(item => (
                                <tr key={`${order.orderId}-${item.itemNm}`}>
                                    <td>
                                        <div className={styles.ProductsProductInfo}>
                                            <div className={styles.ProductImageWrapper}>
                                                <img 
                                                    src={`http://localhost:8080${item.imgUrl}`} 
                                                    alt={item.itemNm}
                                                    className={styles.ProductsProductImage}
                                                />
                                            </div>
                                            <span className={styles.ProductsProductName}>{item.itemNm}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {item.orderPrice != null ? `${item.orderPrice.toLocaleString()} 원` : ''}
                                    </td>
                                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Sale;

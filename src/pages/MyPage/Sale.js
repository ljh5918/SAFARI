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
    
            // 서버에서 받은 데이터를 날짜 형식을 변환하여 상태에 저장
            const saleData = response.data.orders.map(order => {
                const correctedDate = order.orderDate.replace(/(\d{4})-(\d{2})-(\d{2})/, (match, year, month, day) => {
                    // month는 1-12이므로, 잘못된 month 값을 조정합니다.
                    const correctedMonth = month > 12 ? 12 : month;
                    const correctedDay = day > 31 ? 31 : day; // day의 유효성을 체크할 수도 있음
                    return `${year}-${correctedMonth}-${correctedDay}`;
                });
                return { ...order, orderDate: correctedDate };
            });
    
            this.setState({
                sale: saleData,
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

// import React, { Component } from 'react';
// import styles from '../../styles/MyPage/Sale.module.css';

// class Sale extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             sale: [], // 판매내역 데이터 배열
//         };
//     }

//     componentDidMount() {
//         // 임시 데이터 
//         const sampleSaleData = [
//             { id: 1, name: '휴대폰', price: '50,000', date: '2024.06.01', imageUrl: 'https://via.placeholder.com/150' },
//             { id: 2, name: '아이패드', price: '60,000', date: '2024.06.02', imageUrl: 'https://via.placeholder.com/150' },
//             { id: 3, name: '노트북', price: '70,000', date: '2024.06.03', imageUrl: 'https://via.placeholder.com/150' },
//             { id: 4, name: '티셔츠', price: '80,000', date: '2024.06.04', imageUrl: 'https://via.placeholder.com/150' },
//         ];

//         this.setState({ sale: sampleSaleData });
//     }

//     render() {
//         return (
//             <div className={styles.sale}>
//                 <h2>판매내역</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>판매날짜</th>
//                             <th>상품</th>
//                             <th>가격</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.sale.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.date}</td>
//                                 <td>
//                                     <div className={styles.saleProductInfo}>
//                                         <img src={product.imageUrl} alt={product.name} className={styles.saleProductImage} />
//                                         <span className={styles.saleProductName}>{product.name}</span>
//                                     </div>
//                                 </td>
//                                 <td>{product.price}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// export default Sale;



























// Sale.js

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

            console.log("API response:", response.data); 

            this.setState({
                sale: response.data.orders,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error("판매 내역을 가져오는 중 오류 발생:", error); 
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

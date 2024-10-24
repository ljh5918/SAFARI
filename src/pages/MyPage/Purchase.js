// import React, { Component } from 'react';
// import styles from '../../styles/MyPage/Purchase.module.css';

// class Purchase extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             purchase: [], // 구매내역 데이터 배열
//         };
//     }

//     componentDidMount() {
//         // 임시 데이터 사용 
//         const samplePurchaseData = [
//             { id: 1, name: '아이폰', price: '50,000', date: '2024.06.01', imageUrl: 'https://via.placeholder.com/150' },
//             { id: 2, name: '아이패드', price: '60,000', date: '2024.06.02', imageUrl: 'https://via.placeholder.com/150' },
//             { id: 3, name: '노트북', price: '70,000', date: '2024.06.03', imageUrl: 'https://via.placeholder.com/150' },
//             { id: 4, name: '신발', price: '80,000', date: '2024.06.04', imageUrl: 'https://via.placeholder.com/150' },
//         ];

//         this.setState({ purchase: samplePurchaseData });
//     }

//     render() {  //상태의 등록한 상품 데이터를 반복하여 표시
//         return (
//             <div className={styles.purchase}>
//                 <h2>구매내역</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>구매날짜</th>
//                             <th>상품</th>
//                             <th>가격</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.purchase.map(product => (
//                             <tr key={product.id}>
//                                 <td>{product.date}</td>
//                                 <td>
//                                     <div className={styles.purchaseProductInfo}>
//                                         <img src={product.imageUrl} alt={product.name} className={styles.purchaseProductImage} />
//                                         <span className={styles.purchaseProductName}>{product.name}</span>
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

// export default Purchase;

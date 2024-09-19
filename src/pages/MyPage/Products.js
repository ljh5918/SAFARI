// import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; 
// import styles from '../../styles/MyPage/Products.module.css';

// class Products extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             products: [], // 등록한 상품 데이터 배열
//         };
//     }

//     componentDidMount() {
//         // Fetch the products from localStorage
//         const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        
//         // Reverse the products array to show the most recent product first
//         this.setState({ products: storedProducts.reverse() });
//     }

//     render() {
//         return (
//             <div className={styles.Products}>
//                 <h2>등록한 상품</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>상품</th>
//                             <th>가격</th>
//                             <th>수정</th>
//                             <th>삭제</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.products.map(product => (
//                             <tr key={product.id}>
//                                 <td>
//                                     <div className={styles.ProductsProductInfo}>
//                                         {/* Display the first image of the product */}
//                                         <img src={product.images[0]} alt={product.title} className={styles.ProductsProductImage} />
//                                         <span className={styles.ProductsProductName}>{product.title}</span>
//                                     </div>
//                                 </td>
//                                 <td>{product.price} 원</td>
//                                 <td>
//                                     <Link to={`/Edit-Products/${product.id}`} className={styles.editButton}>수정</Link>
//                                 </td>
//                                 <td>
//                                      <button
//                                         onClick={() => this.handleDelete(product.id)}
//                                         className={styles.deleteButton}
//                                     >
//                                         삭제
//                                     </button>
//                                 </td>
                                
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// export default Products;








// import React, { Component } from 'react';
// import { Link } from 'react-router-dom'; 
// import styles from '../../styles/MyPage/Products.module.css';

// class Products extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             products: [], // 등록한 상품 데이터 배열
//         };
//     }

//     componentDidMount() {
//         const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
//         this.setState({ products: storedProducts.reverse() });
//     }

//     handleDelete = (id) => {
//         const { products } = this.state;
//         const updatedProducts = products.filter(product => product.id !== id);
//         localStorage.setItem('products', JSON.stringify(updatedProducts));
//         this.setState({ products: updatedProducts });
//     };

//     render() {
//         return (
//             <div className={styles.Products}>
//                 <h2>등록한 상품</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>상품</th>
//                             <th>가격</th>
//                             <th>수정</th>
//                             <th>삭제</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {this.state.products.map(product => (
//                             <tr key={product.id}>
//                                 <td>
//                                     <div className={styles.ProductsProductInfo}>
//                                         <img src={product.images[0]} alt={product.title} className={styles.ProductsProductImage} />
//                                         <span className={styles.ProductsProductName}>{product.title}</span>
//                                     </div>
//                                 </td>
//                                 <td>{product.price} 원</td>
//                                 <td>
//                                     <button Link to={`/Edit-Products/${product.id}`} className={styles.deleteButton}>수정
//                                     </button>
//                                 </td>
//                                 <td>
//                                     <button
//                                         onClick={() => this.handleDelete(product.id)}
//                                         className={styles.deleteButton}
//                                     >
//                                         삭제
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// export default Products;





import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
import styles from '../../styles/MyPage/Products.module.css';

// HOC: navigate prop을 클래스 컴포넌트에 전달
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
            products: [], // 등록한 상품 데이터 배열
        };
    }

    componentDidMount() {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        this.setState({ products: storedProducts.reverse() });
    }

    handleDelete = (id) => {
        const { products } = this.state;
        const updatedProducts = products.filter(product => product.id !== id);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        this.setState({ products: updatedProducts });
    };

    handleEdit = (id) => {
        // 수정 버튼 클릭 시 호출, navigate로 페이지 이동
        this.props.navigate(`/Edit-Products/${id}`);
    };

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
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div className={styles.ProductsProductInfo}>
                                        <img src={product.images[0]} alt={product.title} className={styles.ProductsProductImage} />
                                        <span className={styles.ProductsProductName}>{product.title}</span>
                                    </div>
                                </td>
                                <td>{product.price} 원</td>
                                <td>
                                  
                                    <button
                                        onClick={() => this.handleEdit(product.id)}
                                    >
                                        수정
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.handleDelete(product.id)}
                                    >
                                        삭제
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default withRouter(Products); // HOC를 사용하여 navigate prop 전달

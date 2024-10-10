


// // import React, { Component } from 'react';
// // import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
// // import styles from '../../styles/MyPage/Products.module.css';

// // // HOC: navigate prop을 클래스 컴포넌트에 전달
// // function withRouter(Component) {
// //     function ComponentWithRouterProp(props) {
// //         let navigate = useNavigate();
// //         return <Component {...props} navigate={navigate} />;
// //     }

// //     return ComponentWithRouterProp;
// // }

// // class Products extends Component {
// //     constructor(props) {
// //         super(props);
// //         this.state = {
// //             products: [], // 등록한 상품 데이터 배열
// //         };
// //     }

// //     componentDidMount() {
// //         const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
// //         this.setState({ products: storedProducts.reverse() });
// //     }

// //     handleDelete = (id) => {
// //         const { products } = this.state;
// //         const updatedProducts = products.filter(product => product.id !== id);
// //         localStorage.setItem('products', JSON.stringify(updatedProducts));
// //         this.setState({ products: updatedProducts });
// //     };

// //     handleEdit = (id) => {
// //         // 수정 버튼 클릭 시 호출, navigate로 페이지 이동
// //         this.props.navigate(`/Edit-Products/${id}`);
// //     };

// //     render() {
// //         return (
// //             <div className={styles.Products}>
// //                 <h2>등록한 상품</h2>
// //                 <table>
// //                     <thead>
// //                         <tr>
// //                             <th>상품</th>
// //                             <th>가격</th>
// //                             <th>수정</th>
// //                             <th>삭제</th>
// //                         </tr>
// //                     </thead>
// //                     <tbody>
// //                         {this.state.products.map(product => (
// //                             <tr key={product.id}>
// //                                 <td>
// //                                     <div className={styles.ProductsProductInfo}>
// //                                         <img src={product.images[0]} alt={product.title} className={styles.ProductsProductImage} />
// //                                         <span className={styles.ProductsProductName}>{product.title}</span>
// //                                     </div>
// //                                 </td>
// //                                 <td>{product.price} 원</td>
// //                                 <td>
                                  
// //                                     <button
// //                                         onClick={() => this.handleEdit(product.id)}
// //                                     >
// //                                         수정
// //                                     </button>
// //                                 </td>
// //                                 <td>
// //                                     <button
// //                                         onClick={() => this.handleDelete(product.id)}
// //                                     >
// //                                         삭제
// //                                     </button>
// //                                 </td>
// //                             </tr>
// //                         ))}
// //                     </tbody>
// //                 </table>
// //             </div>
// //         );
// //     }
// // }

// // export default withRouter(Products); // HOC를 사용하여 navigate prop 전달













// import React, { Component } from 'react';
// import { useNavigate } from 'react-router-dom'; // useNavigate 훅 사용
// import styles from '../../styles/MyPage/Products.module.css';

// // HOC: navigate prop을 클래스 컴포넌트에 전달
// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let navigate = useNavigate();
//         return <Component {...props} navigate={navigate} />;
//     }

//     return ComponentWithRouterProp;
// }

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
//                             product ? ( // product가 null이 아닐 때만 렌더링
//                                 <tr key={product.id}>
//                                     <td>
//                                         <div className={styles.ProductsProductInfo}>
//                                             <span className={styles.ProductsProductName}>{product.title}</span>
//                                         </div>
//                                     </td>
//                                     <td>{product.price} 원</td>
//                                     <td>
//                                         <button>
//                                             수정
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <button>
//                                             삭제
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ) : null // null일 경우 아무것도 렌더링하지 않음
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         );
//     }
// }

// export default withRouter(Products); // HOC를 사용하여 navigate prop 전달




// import React, { Component } from 'react';
// import { useNavigate } from 'react-router-dom'; // useNavigate hook
// import axios from 'axios'; // Ensure you have axios installed
// import styles from '../../styles/MyPage/Products.module.css';

// // HOC: navigate prop to class component
// function withRouter(Component) {
//     function ComponentWithRouterProp(props) {
//         let navigate = useNavigate();
//         return <Component {...props} navigate={navigate} />;
//     }

//     return ComponentWithRouterProp;
// }

// class Products extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             products: [], // Array to hold registered product data
//             loading: true, // Loading state to indicate data fetching
//             error: null, // State to hold error messages
//         };
//     }

//     componentDidMount() {
//         this.fetchProducts(); // Fetch products when component mounts
//     }

//     fetchProducts = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/'); // Adjust the URL according to your backend API
//             this.setState({ products: response.data.items.reverse(), loading: false });
//         } catch (error) {
//             console.error("Error fetching products:", error);
//             this.setState({ error: "Failed to fetch products", loading: false });
//         }
//     }

//     handleEdit = (productId) => {
//         // Navigate to edit page (you need to implement the edit logic)
//         this.props.navigate(`/edit/${productId}`);
//     }

//     handleDelete = async (productId) => {
//         // Add logic to delete the product
//         try {
//             await axios.delete(`/admin/item/${productId}`); // Adjust the URL accordingly
//             this.fetchProducts(); // Refresh the product list after deletion
//         } catch (error) {
//             console.error("Error deleting product:", error);
//             this.setState({ error: "Failed to delete product" });
//         }
//     }

//     render() {
//         const { products, loading, error } = this.state;

//         return (
//             <div className={styles.Products}>
//                 <h2>등록한 상품</h2>
//                 {loading ? (
//                     <p>Loading products...</p>
//                 ) : error ? (
//                     <p>{error}</p>
//                 ) : (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>상품</th>
//                                 <th>가격</th>
//                                 <th>수정</th>
//                                 <th>삭제</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {products.map(product => (
//                                 <tr key={product.id}>
//                                     <td>
//                                         <div className={styles.ProductsProductInfo}>
//                                             <span className={styles.ProductsProductName}>{product.title}</span>
//                                         </div>
//                                     </td>
//                                     <td>{product.price} 원</td>
//                                     <td>
//                                         <button onClick={() => this.handleEdit(product.id)}>
//                                             수정
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <button onClick={() => this.handleDelete(product.id)}>
//                                             삭제
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         );
//     }
// }

// export default withRouter(Products);




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
        this.fetchProducts();
    }

    fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/'); // Adjust the URL
            this.setState({ products: response.data.items.reverse(), loading: false });
        } catch (error) {
            console.error("Error fetching products:", error);
            this.setState({ error: "Failed to fetch products", loading: false });
        }
    }

    handleEdit = (productId) => {
        this.props.navigate(`/edit/${productId}`);
    }

    handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8080/${productId}`);
            this.fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            this.setState({ error: "Failed to delete product" });
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
                                <th>수정</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>
                                        <div className={styles.ProductsProductInfo}>
                                            <img 
                                                src={`http://localhost:8080${product.imgUrl}`} // Ensure imgUrl is correct
                                                alt={product.title}
                                                className={styles.ProductsProductImage}
                                            />
                                            <span className={styles.ProductsProductName}>{product.title}</span>
                                        </div>
                                    </td>
                                    <td>{product.price} 원</td>
                                    <td>
                                        <button onClick={() => this.handleEdit(product.id)}>
                                            수정
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.handleDelete(product.id)}>
                                            삭제
                                        </button>
                                    </td>
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

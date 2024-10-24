// // import React, { Component } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import axios from 'axios';
// // import styles from '../../styles/MyPage/Products.module.css';

// // function withRouter(Component) {
// //   function ComponentWithRouterProp(props) {
// //     let navigate = useNavigate();
// //     return <Component {...props} navigate={navigate} />;
// //   }
// //   return ComponentWithRouterProp;
// // }

// // class Products extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       products: [],
// //       loading: true,
// //       error: null,
// //     };
// //   }

// //   componentDidMount() {
// //     this.fetchProducts();
// //   }

// //   // Fetch the user's registered products
// //   fetchProducts = async () => { 
// //     const token = localStorage.getItem('token'); // Get the token
// //     if (!token) {
// //       this.setState({ error: 'No token found, please log in', loading: false });
// //       return;
// //     }

// //     try {
// //       // Changed the endpoint to fetch user's registered products
// //       const response = await axios.get('http://localhost:8080/user/items', {
        
// //         headers: {
// //           Authorization: `Bearer ${token}` // Include token in the request
// //         }
// //       });
// //       this.setState({
// //         products: response.data.reverse(), // Adjust based on the structure of response.data
// //         loading: false
// //       });
// //     } catch (error) {
// //       this.setState({
// //         error: '제품을 가져오지 못했습니다',
// //         loading: false
// //       });
// //     }
// //   };

// //   handleEdit = (productId) => {
// //     this.props.navigate(`/Edit-Products/${productId}`);
// //   };

// //   handleDelete = async (productId) => {
// //     if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
// //       const token = localStorage.getItem('token');
// //       try {
// //         await axios.post(`http://localhost:8080/admin/item/delete/${productId}`, null, { // Adjust the delete endpoint if needed
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });
// //         this.setState((prevState) => ({
// //           products: prevState.products.filter((product) => product.id !== productId),
// //         }));
// //         alert('상품이 삭제되었습니다.');
// //       } catch (error) {
// //         alert('상품 삭제 중 오류가 발생했습니다.');
// //       }
// //     }
// //   };

// //   render() {
// //     const { products, loading, error } = this.state;
  
// //     return (
// //       <div className={styles.Products}>
// //         <h2>등록한 상품</h2>
// //         {loading ? (
// //           <p>Loading products...</p>
// //         ) : error ? (
// //           <p>{error}</p>
// //         ) : (
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>상품</th>
// //                 <th>가격</th>
// //                 <th>수정</th>
// //                 <th>삭제</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {products.map((product) => (
// //                 <tr key={product.id}>
// //                   <td>
// //                     <div className={styles.ProductsProductInfo}>
// //                       <img
// //                          src={`http://localhost:8080${product.itemImgDtoList.find(img => img.repImgYn === 'Y')?.imgUrl}`} 
// //                          alt={product.itemNm}
// //                         className={styles.ProductsProductImage}
// //                       />
// //                       <Link to={`/products/${product.id}`} className={styles.ProductsProductName}>
// //                         {product.itemNm}
// //                       </Link>
// //                     </div>
// //                   </td>
// //                   <td>{product.price} 원</td>
// //                   <td>
// //                     <button onClick={() => this.handleEdit(product.id)}>수정</button>
// //                   </td>
// //                   <td>
// //                     <button onClick={() => this.handleDelete(product.id)}>삭제</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         )}
// //       </div>
// //     );
// //   }
// // }

// // export default withRouter(Products);




























import React, { Component } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/MyPage/Products.module.css';

// withRouter HOC 정의
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

    // 사용자의 등록된 상품을 가져오는 함수
    fetchProducts = async () => {
        const token = localStorage.getItem('token'); // 토큰 가져오기
        if (!token) {
            this.setState({ error: '토큰이 없습니다. 로그인 해주세요.', loading: false });
            return;
        }

        try {
            const response = await axios.get('http://localhost:8080/user/items', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const availableProducts = Array.isArray(response.data)
                ? response.data.filter(product => product.itemSellStatus !== 'SOLD_OUT')
                : (response.data.items || []).filter(product => product.itemSellStatus !== 'SOLD_OUT');

            this.setState({
                products: availableProducts.reverse(),
                loading: false
            });
        } catch (error) {
            this.setState({
                error: '제품을 가져오지 못했습니다',
                loading: false
            });
        }
    };

    // 상품 수정 핸들러
    handleEdit = (productId) => {
        this.props.navigate(`/Edit-Products/${productId}`);
    };

    // 상품 삭제 핸들러
    handleDelete = async (productId) => {
        if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
            const token = localStorage.getItem('token');
            try {
                await axios.post(`http://localhost:8080/admin/item/delete/${productId}`, null, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.setState((prevState) => ({
                    products: prevState.products.filter((product) => product.id !== productId),
                }));
                alert('상품이 삭제되었습니다.');
            } catch (error) {
                alert('상품 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    // 상품 판매완료 핸들러
    handleSoldOut = async (productId) => {
        if (window.confirm("이 상품을 판매 완료로 표시하시겠습니까?")) {
            const token = localStorage.getItem('token'); 

            const orderData = {
                itemId: productId,
                count: 1,
            };

            try {
                await axios.post('http://localhost:8080/order', orderData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                this.setState((prevState) => ({
                    products: prevState.products.filter((product) => product.id !== productId),
                }));

                alert("상품이 판매 완료로 표시되었습니다.");

                this.props.onSoldOut();
            } catch (error) {
                alert("판매 완료 처리 중 오류가 발생했습니다.");
                if (error.response && error.response.status === 401) {
                    alert("인증 정보가 없습니다. 다시 로그인해주세요.");
                }
            }
        }
    };

    render() {
        const { products, loading, error } = this.state;

        return (
            <div className={styles.Products}>
                <h2>등록한 상품</h2>
                {loading ? (
                    <p>Loading...</p>
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
                                <th>판매완료</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td>
                                        <div className={styles.ProductsProductInfo}>
                                            <div className={styles.ProductsProductImageWrapper}>
                                                <img 
                                                    src={`http://localhost:8080${product.itemImgDtoList.find(img => img.repImgYn === 'Y')?.imgUrl}`} 
                                                    alt={product.itemNm}
                                                    className={styles.ProductsProductImage}
                                                />
                                            </div>
                                            <span className={styles.ProductsProductName}>{product.itemNm}</span>
                                        </div>
                                    </td>
                                    <td>{product.price.toLocaleString()} 원</td>
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
                                    <td>
                                        <button onClick={() => this.handleSoldOut(product.id)}>
                                            판매완료
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

// // // // // // // // // // // // // // import React, { Component } from 'react';
// // // // // // // // // // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // import axios from 'axios';
// // // // // // // // // // // // // // import styles from '../../styles/MyPage/Products.module.css';

// // // // // // // // // // // // // // function withRouter(Component) {
// // // // // // // // // // // // // //     function ComponentWithRouterProp(props) {
// // // // // // // // // // // // // //         let navigate = useNavigate();
// // // // // // // // // // // // // //         return <Component {...props} navigate={navigate} />;
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // //     return ComponentWithRouterProp;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // class Products extends Component {
// // // // // // // // // // // // // //     constructor(props) {
// // // // // // // // // // // // // //         super(props);
// // // // // // // // // // // // // //         this.state = {
// // // // // // // // // // // // // //             products: [],
// // // // // // // // // // // // // //             loading: true,
// // // // // // // // // // // // // //             error: null,
// // // // // // // // // // // // // //         };
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     componentDidMount() {
// // // // // // // // // // // // // //         this.fetchProducts(); // Fetch products on component mount
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     fetchProducts = async () => {
// // // // // // // // // // // // // //         try {
// // // // // // // // // // // // // //             const response = await axios.get('http://localhost:8080/'); 
// // // // // // // // // // // // // //             this.setState({ products: response.data.items.reverse(), loading: false });
// // // // // // // // // // // // // //         } catch (error) {
// // // // // // // // // // // // // //             console.error("Error fetching products:", error);
// // // // // // // // // // // // // //             this.setState({ error: "Failed to fetch products", loading: false });
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     handleEdit = (productId) => {
// // // // // // // // // // // // // //         this.props.navigate(`/Edit-Products/${productId}`);
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     handleDelete = (productId) => {
// // // // // // // // // // // // // //         if (window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
           
// // // // // // // // // // // // // //             this.setState((prevState) => ({
// // // // // // // // // // // // // //                 products: prevState.products.filter(product => product.id !== productId), 
// // // // // // // // // // // // // //             }));
// // // // // // // // // // // // // //             alert("상품이 삭제되었습니다."); 
// // // // // // // // // // // // // //         }
// // // // // // // // // // // // // //     }

// // // // // // // // // // // // // //     render() {
// // // // // // // // // // // // // //         const { products, loading, error } = this.state;

// // // // // // // // // // // // // //         return (
// // // // // // // // // // // // // //             <div className={styles.Products}>
// // // // // // // // // // // // // //                 <h2>등록한 상품</h2>
// // // // // // // // // // // // // //                 {loading ? (
// // // // // // // // // // // // // //                     <p>Loading products...</p>
// // // // // // // // // // // // // //                 ) : error ? (
// // // // // // // // // // // // // //                     <p>{error}</p>
// // // // // // // // // // // // // //                 ) : (
// // // // // // // // // // // // // //                     <table>
// // // // // // // // // // // // // //                         <thead>
// // // // // // // // // // // // // //                             <tr>
// // // // // // // // // // // // // //                                 <th>상품</th>
// // // // // // // // // // // // // //                                 <th>가격</th>
// // // // // // // // // // // // // //                                 <th>수정</th>
// // // // // // // // // // // // // //                                 <th>삭제</th>
// // // // // // // // // // // // // //                             </tr>
// // // // // // // // // // // // // //                         </thead>
// // // // // // // // // // // // // //                         <tbody>
// // // // // // // // // // // // // //                             {products.map(product => (
// // // // // // // // // // // // // //                                 <tr key={product.id}>
// // // // // // // // // // // // // //                                     <td>
// // // // // // // // // // // // // //                                         <div className={styles.ProductsProductInfo}>
// // // // // // // // // // // // // //                                             <img 
// // // // // // // // // // // // // //                                                 src={`http://localhost:8080${product.imgUrl}`} 
// // // // // // // // // // // // // //                                                 alt={product.itemNm}
// // // // // // // // // // // // // //                                                 className={styles.ProductsProductImage}
// // // // // // // // // // // // // //                                             />
// // // // // // // // // // // // // //                                             <span className={styles.ProductsProductName}>{product.itemNm}</span>
// // // // // // // // // // // // // //                                         </div>
// // // // // // // // // // // // // //                                     </td>
// // // // // // // // // // // // // //                                     <td>{product.price} 원</td>
// // // // // // // // // // // // // //                                     <td>
// // // // // // // // // // // // // //                                         <button onClick={() => this.handleEdit(product.id)}>
// // // // // // // // // // // // // //                                             수정
// // // // // // // // // // // // // //                                         </button>
// // // // // // // // // // // // // //                                     </td>
// // // // // // // // // // // // // //                                     <td>
// // // // // // // // // // // // // //                                         <button onClick={() => this.handleDelete(product.id)}>
// // // // // // // // // // // // // //                                             삭제
// // // // // // // // // // // // // //                                         </button>
// // // // // // // // // // // // // //                                     </td>
// // // // // // // // // // // // // //                                 </tr>
// // // // // // // // // // // // // //                             ))}
// // // // // // // // // // // // // //                         </tbody>
// // // // // // // // // // // // // //                     </table>
// // // // // // // // // // // // // //                 )}
// // // // // // // // // // // // // //             </div>
// // // // // // // // // // // // // //         );
// // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // // export default withRouter(Products);



















// // import React, { Component } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import styles from '../../styles/MyPage/Products.module.css';

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
// //             products: [],
// //             loading: true,
// //             error: null,
// //         };
// //     }

// //     componentDidMount() {
// //         this.fetchProducts(); // Fetch products on component mount
// //     }

// //     fetchProducts = async () => {
// //         try {
// //             const response = await axios.get('http://localhost:8080/'); 
// //             this.setState({ products: response.data.items.reverse(), loading: false });
// //         } catch (error) {
// //             console.error("Error fetching products:", error);
// //             this.setState({ error: "Failed to fetch products", loading: false });
// //         }
// //     }

// //     handleEdit = (productId) => {
// //         this.props.navigate(`/Edit-Products/${productId}`);
// //     }

// //     handleDelete = async (productId) => {
// //         if (window.confirm("정말로 이 상품을 삭제하시겠습니까?")) {
// //             const token = localStorage.getItem('token'); // JWT 토큰을 로컬 스토리지에서 가져오기
    
// //             try {
// //                 // 서버에 삭제 요청 보내기, 헤더에 토큰 추가
// //                 await axios.post(`http://localhost:8080/admin/item/delete/${productId}`, null, {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`, // 인증을 위한 토큰 추가
// //                     },
// //                 });
    
// //                 // 업데이트된 제품 목록 상태 설정
// //                 this.setState((prevState) => ({
// //                     products: prevState.products.filter(product => product.id !== productId),
// //                 }));
// //                 alert("상품이 삭제되었습니다."); 
// //             } catch (error) {
// //                 console.error("Error deleting product:", error);
// //                 alert("상품 삭제 중 오류가 발생했습니다.");
// //                 if (error.response && error.response.status === 401) {
// //                     alert("인증 정보가 없습니다. 다시 로그인해주세요.");
// //                 }
// //             }
// //         }
// //     }
    

// //     render() {
// //         const { products, loading, error } = this.state;

// //         return (
// //             <div className={styles.Products}>
// //                 <h2>등록한 상품</h2>
// //                 {loading ? (
// //                     <p>Loading products...</p>
// //                 ) : error ? (
// //                     <p>{error}</p>
// //                 ) : (
// //                     <table>
// //                         <thead>
// //                             <tr>
// //                                 <th>상품</th>
// //                                 <th>가격</th>
// //                                 <th>수정</th>
// //                                 <th>삭제</th>
// //                             </tr>
// //                         </thead>
// //                         <tbody>
// //                             {products.map(product => (
// //                                 <tr key={product.id}>
// //                                     <td>
// //                                         <div className={styles.ProductsProductInfo}>
// //                                             <img 
// //                                                 src={`http://localhost:8080${product.imgUrl}`} 
// //                                                 alt={product.itemNm}
// //                                                 className={styles.ProductsProductImage}
// //                                             />
// //                                             <span className={styles.ProductsProductName}>{product.itemNm}</span>
// //                                         </div>
// //                                     </td>
// //                                     <td>{product.price} 원</td>
// //                                     <td>
// //                                         <button onClick={() => this.handleEdit(product.id)}>
// //                                             수정
// //                                         </button>
// //                                     </td>
// //                                     <td>
// //                                         <button onClick={() => this.handleDelete(product.id)}>
// //                                             삭제
// //                                         </button>
// //                                     </td>
// //                                 </tr>
// //                             ))}
// //                         </tbody>
// //                     </table>
// //                 )}
// //             </div>
// //         );
// //     }
// // }

// // export default withRouter(Products);



















// import React, { Component } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import styles from '../../styles/MyPage/Products.module.css';

// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     let navigate = useNavigate();
//     return <Component {...props} navigate={navigate} />;
//   }
//   return ComponentWithRouterProp;
// }

// class Products extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//       loading: true,
//       error: null,
//     };
//   }

//   componentDidMount() {
//     this.fetchProducts();
//   }

// // //  // 메인페이지의 아이템 모두 가져옴  
// // fetchProducts = async () => {
// //   const token = localStorage.getItem('token');
// //   if (!token) {
// //     this.setState({ error: 'No token found, please log in', loading: false });
// //     return;
// //   }

// //   try {
// //     const response = await axios.get('http://localhost:8080/user/items', {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     });
// //     console.log(response.data); // Check the response data structure
// //     this.setState({ products: response.data.reverse(), loading: false });
// //   } catch (error) {
// //     this.setState({ error: 'Failed to fetch products', loading: false });
// //   }
// // };



 

//   // 종민 등록상품나옴
//   fetchProducts = async () => { 
    
//     try {
//         const token = localStorage.getItem('token'); // Get the token
//         const response = await axios.get('http://localhost:8080/admin/items', {
//             headers: {
//                 Authorization: `Bearer ${token}` // Include token in the request
//             }
//         });
//         this.setState({
//             products: response.data.items.reverse(),
//             loading: false
//         });
//     } catch (error) {
//         this.setState({
//             error: '제품을 가져오지 못했습니다',
//             loading: false
//         });
//     }
// };


//   handleEdit = (productId) => {
//     this.props.navigate(`/Edit-Products/${productId}`);
//   };

//   handleDelete = async (productId) => {
//     if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
//       const token = localStorage.getItem('token');
//       try {
//         await axios.post(`http://localhost:8080/admin/item/delete/${productId}`, null, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         this.setState((prevState) => ({
//           products: prevState.products.filter((product) => product.id !== productId),
//         }));
//         alert('상품이 삭제되었습니다.');
//       } catch (error) {
//         alert('상품 삭제 중 오류가 발생했습니다.');
//       }
//     }
//   };

//   render() {
//     const { products, loading, error } = this.state;
  
//     return (
//       <div className={styles.Products}>
//         <h2>등록한 상품</h2>
//         {loading ? (
//           <p>Loading products...</p>
//         ) : error ? (
//           <p>{error}</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>상품</th>
//                 <th>가격</th>
//                 <th>수정</th>
//                 <th>삭제</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product.id}>
//                   <td>
//                     <div className={styles.ProductsProductInfo}>
//                       <img
//                         src={`http://localhost:8080${product.imgUrl}`} // Ensure imgUrl is correct
//                         alt={product.itemNm}
//                         className={styles.ProductsProductImage}
//                       />
//                       <Link to={`/products/${product.id}`} className={styles.ProductsProductName}>
//                         {product.itemNm}
//                       </Link>
//                     </div>
//                   </td>
//                   <td>{product.price} 원</td>
//                   <td>
//                     <button onClick={() => this.handleEdit(product.id)}>수정</button>
//                   </td>
//                   <td>
//                     <button onClick={() => this.handleDelete(product.id)}>삭제</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     );
//   }
  
// }

// export default withRouter(Products);




























import React, { Component } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  // Fetch the user's registered products
  fetchProducts = async () => { 
    const token = localStorage.getItem('token'); // Get the token
    if (!token) {
      this.setState({ error: 'No token found, please log in', loading: false });
      return;
    }

    try {
      // Changed the endpoint to fetch user's registered products
      const response = await axios.get('http://localhost:8080/user/items', {
        
        headers: {
          Authorization: `Bearer ${token}` // Include token in the request
        }
      });
      this.setState({
        products: response.data.reverse(), // Adjust based on the structure of response.data
        loading: false
      });
    } catch (error) {
      this.setState({
        error: '제품을 가져오지 못했습니다',
        loading: false
      });
    }
  };

  handleEdit = (productId) => {
    this.props.navigate(`/Edit-Products/${productId}`);
  };

  handleDelete = async (productId) => {
    if (window.confirm('정말로 이 상품을 삭제하시겠습니까?')) {
      const token = localStorage.getItem('token');
      try {
        await axios.post(`http://localhost:8080/user/item/delete/${productId}`, null, { // Adjust the delete endpoint if needed
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.ProductsProductInfo}>
                      <img
                         src={`http://localhost:8080${product.itemImgDtoList.find(img => img.repImgYn === 'Y')?.imgUrl}`} 
                         alt={product.itemNm}
                        className={styles.ProductsProductImage}
                      />
                      <Link to={`/products/${product.id}`} className={styles.ProductsProductName}>
                        {product.itemNm}
                      </Link>
                    </div>
                  </td>
                  <td>{product.price} 원</td>
                  <td>
                    <button onClick={() => this.handleEdit(product.id)}>수정</button>
                  </td>
                  <td>
                    <button onClick={() => this.handleDelete(product.id)}>삭제</button>
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

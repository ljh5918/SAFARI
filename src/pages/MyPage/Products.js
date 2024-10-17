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
        await axios.post(`http://localhost:8080/admin/item/delete/${productId}`, null, { // Adjust the delete endpoint if needed
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

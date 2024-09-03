// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import iphone11 from '../../images/iphone11.png';
// import iphone12 from '../../images/iphone12.png';
// import ipad from '../../images/ipadPro.png';
// import apwatch from '../../images/apwatch.png';
// import mac from '../../images/mac.png';
// import galaxyS21 from '../../images/galaxyS21.png';

// import '../../styles/Search/SearchResult.css'; // CSS 파일을 추가합니다.

// const products = [
//   { id: 1, name: 'iPhone 12', description: 'New iPhone 12 for sale', image: iphone12, price: '10000원' },
//   { id: 2, name: 'Samsung Galaxy S21', description: 'Brand new Galaxy S21', image: galaxyS21, price: '7500원' },
//   { id: 3, name: 'iPhone 11', description: 'Used iPhone 11 in good condition', image: iphone11, price: '6000원' },
//   { id: 4, name: 'iPad Pro', description: 'iPad Pro for sale', image: ipad, price: '100000원' },
//   { id: 5, name: 'Apple Watch', description: 'Apple Watch Series 6', image: apwatch, price: '4000원' },
//   { id: 6, name: 'MacBook Air', description: 'M1 MacBook Air for sale', image: mac, price: '120000원' },
//   { id: 6, name: 'MacBook Air', description: 'M1 MacBook Air for sale', image: mac, price: '120000원' },
//   { id: 7, name: 'iPhone 12', description: 'New iPhone 12 for sale', image: iphone12, price: '10000원' },
//   { id: 8, name: 'Samsung Galaxy S21', description: 'Brand new Galaxy S21', image: galaxyS21, price: '7500원' },
//   { id: 9, name: 'iPhone 11', description: 'Used iPhone 11 in good condition', image: iphone11, price: '6000원' },
//   { id: 10, name: 'iPad Pro', description: 'iPad Pro for sale', image: ipad, price: '100000원' },
//   { id: 11, name: 'Apple Watch', description: 'Apple Watch Series 6', image: apwatch, price: '4000원' },
//   { id: 12, name: 'MacBook Air', description: 'M1 MacBook Air for sale', image: mac, price: '120000원' },
//   { id: 13, name: 'iPhone 12', description: 'New iPhone 12 for sale', image: iphone12, price: '10000원' },
//   { id: 14, name: 'Samsung Galaxy S21', description: 'Brand new Galaxy S21', image: galaxyS21, price: '7500원' },
//   { id: 15, name: 'iPhone 11', description: 'Used iPhone 11 in good condition', image: iphone11, price: '6000원' },
//   { id: 16, name: 'iPad Pro', description: 'iPad Pro for sale', image: ipad, price: '100000원' },
//   { id: 17, name: 'Apple Watch', description: 'Apple Watch Series 6', image: apwatch, price: '4000원' },
//   { id: 18, name: 'MacBook Air', description: 'M1 MacBook Air for sale', image: mac, price: '120000원' },
//   { id: 19, name: 'iPhone 12', description: 'New iPhone 12 for sale', image: iphone12, price: '10000원' },
//   { id: 20, name: 'Samsung Galaxy S21', description: 'Brand new Galaxy S21', image: galaxyS21, price: '7500원' },
//   { id: 21, name: 'iPhone 11', description: 'Used iPhone 11 in good condition', image: iphone11, price: '6000원' },
//   { id: 22, name: 'iPad Pro', description: 'iPad Pro for sale', image: ipad, price: '100000원' },
//   { id: 23, name: 'Apple Watch', description: 'Apple Watch Series 6', image: apwatch, price: '4000원' },
//   { id: 24, name: 'MacBook Air', description: 'M1 MacBook Air for sale', image: mac, price: '120000원' },
//   { id: 25, name: 'iPhone 12', description: 'New iPhone 12 for sale', image: iphone12, price: '10000원' },
//   { id: 26, name: 'Samsung Galaxy S21', description: 'Brand new Galaxy S21', image: galaxyS21, price: '7500원' },
//   { id: 27, name: 'iPhone 11', description: 'Used iPhone 11 in good condition', image: iphone11, price: '6000원' },
//   { id: 28, name: 'iPad Pro', description: 'iPad Pro for sale', image: ipad, price: '100000원' },
//   { id: 29, name: 'Apple Watch', description: 'Apple Watch Series 6', image: apwatch, price: '4000원' },
//   { id: 30, name: 'MacBook Air', description: 'M1 MacBook Air for sale', image: mac, price: '120000원' },
//   { id: 31, name: 'iPhone 12', description: 'New iPhone 12 for sale', image: iphone12, price: '10000원' },
//   { id: 32, name: 'Samsung Galaxy S21', description: 'Brand new Galaxy S21', image: galaxyS21, price: '7500원' },
//   { id: 33, name: 'iPhone 11', description: 'Used iPhone 11 in good condition', image: iphone11, price: '6000원' },
//   { id: 34, name: 'iPad Pro', description: 'iPad Pro for sale', image: ipad, price: '100000원' },
//   { id: 35, name: 'Apple Watch', description: 'Apple Watch Series 6', image: apwatch, price: '4000원' },
//   { id: 36, name: 'MacBook Air', description: 'M1 MacBook Air for sale', image: mac, price: '120000원' },
//   // 추가된 제품들...
// ];

// const SearchResult = () => {
//   const [results, setResults] = useState([]);
//   const [query, setQuery] = useState('');
//   const location = useLocation();

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const searchQuery = queryParams.get('q') || '';
//     setQuery(searchQuery);

//     // 검색어를 기반으로 제품 필터링
//     const filteredProducts = products.filter(product =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       product.description.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     setResults(filteredProducts);
//   }, [location.search]);

//   // 설명을 14자까지 자르고, 그 뒤에 '...'을 추가하는 함수
//   const truncateText = (text) => {
//     return text.length > 10 ? text.slice(0, 10) + '...' : text;
//   };

//   return (
//     <div className="container">
//       <header className="productSection heading">
//         <h2>검색 카테고리 구현</h2>
//       </header>

//       <main className="productSection">
//         {results.length > 0 ? (
//           <div className="productGrid">
//             {results.map(product => (
//               <div key={product.id} className="productBox">
//                 <div className="productImg">
//                   <img src={product.image} alt={product.name} />
//                 </div>
//                 <div className="productDetails">
//                   <h4>{truncateText(product.name)}</h4>
//                   <p>{truncateText(product.description)}</p>
//                   <span>{product.price}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="noResultsMessage">
//             <span style={{ color: 'red' }}>{query}</span>
//             <br />에 대한 검색결과가 없습니다.
//           </p>
//         )}
//         <div className="moreButtonContainer">
//           <button className="loadMoreButton">더 보기</button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default SearchResult;




























import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from '../../styles/Search/SearchResult.module.css';

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';

    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredResults = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filteredResults);
  }, [location.search]);

  return (
    <div className={styles.container}>
      <div className={styles.productSection}>
        <div className={styles.heading}>
          <h2>검색 카테고리 구현</h2>
        </div>
        <div className={styles.productGrid}>
          {results.length > 0 ? (
            results.map((product) => (
              <div key={product.id} className={styles.productBox}>
                <div className={styles.productImg}>
                  <img src={product.images[0]} alt={product.title} />
                </div>
                <div className={styles.productDetails}>
                  <h4>{product.title}</h4>
                  <p>{product.categories}</p>
                  <span>{product.price} 원</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResultsMessage}>
              에 대한 검색결과가 없습니다.
            </div>
          )}
        </div>
        {results.length > 0 && (
          <div className={styles.moreButtonContainer}>
            <button className={styles.loadMoreButton}>더 보기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;


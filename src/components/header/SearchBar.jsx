import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/header/Header.module.css';
import '../../styles/Search/SearchBar.css'; 
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  
  const handleSearch = (event) => {
    event.preventDefault();

     // 검색어를 쿼리 파라미터로 전달
     navigate(`/search-results?q=${encodeURIComponent(query)}`);
    };


  return (
    <div className="Search">
       <div className={`${styles.searchBox} ${styles.f_flex}`}>
       <form onSubmit={handleSearch}>
       <input
            type="text"
            placeholder="검색어 입력..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
         <FontAwesomeIcon icon={faSearch} className={styles.icon} />
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
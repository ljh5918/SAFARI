import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/header/Header.module.css';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    if (query.trim()) {
      // 검색어를 쿼리 파라미터로 전달하며 검색 결과 페이지로 이동
      navigate(`/search-results?q=${encodeURIComponent(query)}`);
      setQuery(''); // 검색어 초기화 (선택 사항)
    }
  };

  return (
    <div className="Search">
      <div className={`${styles.searchBox} ${styles.f_flex}`}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="물품을 검색해보세요"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="검색어 입력"
          />
          <button type="submit" className={styles.searchButton} aria-label="검색">
            <FontAwesomeIcon icon={faSearch} className={styles.icon} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;

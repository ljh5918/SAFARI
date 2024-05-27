import React from 'react';

const SearchBar = () => {
  return (
    <div className="search-box f_flex">
      <i className="fa fa-search"></i>
      <input type="text" placeholder="원하는 물품 검색!" />
      <span> </span>
    </div>
  );
};

export default SearchBar;
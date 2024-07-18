import React, { useState } from 'react';
import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search_bar">
        <div className="search_product">
          <input
            type="search"
            placeholder="Search Your Product"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} 
          />
        </div>
        <div className="search_icon">
          <Link to={`/searchresult?search=${query}`}>
            <FaSearch />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

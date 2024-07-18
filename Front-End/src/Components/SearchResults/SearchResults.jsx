import React, { useEffect, useState } from 'react';
import Item from '../Item/Item'; 
import { useLocation } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [itemShow, setItemShow] = useState(5);
  const itemsIncrement = 2;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('search');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5173/searchproducts?search=${query}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handleLoadMore = () => {
    setItemShow((prev) => prev + itemsIncrement);
  };

  return (
    <div className="search-results uni-padding">
      <h2 className="search-results-title">Search Results for "{query}"</h2>
      {searchResults.length === 0 && (
        <p className="product-not-found">No results found for "{query}". Please try another search term.</p>
      )}
      <div className="collection-item search-item">
        {searchResults.slice(0, itemShow).map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      {itemShow < searchResults.length && (
        <button className="btn load-more" onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default SearchResults;

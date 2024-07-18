import React from "react";
import { Link } from 'react-router-dom';

const FilterProduct = ({ filteredProducts, totalProducts }) => {
  return (
    <div className="shopping-category-indexSort">
      <p>
        <span>Showing 1-{filteredProducts.length} </span>out of{" "}
        {totalProducts} products
      </p>
      <select name="" id="" className="shopping-category-sorting btn">
        <option value="">Sort By</option>
        <option value="best_selling">Best Selling</option>
        <optgroup label="Price">
        <option value="low_to_high">Low to High</option>
          <option value="high_to_low">High to Low</option>
        </optgroup>
        <optgroup label="Date">
          <option value="old_to_new">
            <Link to="/oldtonew">Old to New</Link>
          </option>
          <option value="new_to_old">
            <Link to="/newtoold">New to Old</Link>
          </option>
        </optgroup>
      </select>
    </div>
  );
};

export default FilterProduct;

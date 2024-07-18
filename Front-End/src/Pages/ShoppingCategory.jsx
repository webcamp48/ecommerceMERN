import React, { useContext, useState } from "react";
import "./CSS/ShoppingCategory.css";
import { ShoppingContext } from "../Contexts/ShoppingContext";
import { FaChevronDown } from "react-icons/fa";
import Item from "./../Components/Item/Item";
import FilterProduct from "../Components/FilterProduct/FilterProduct";

const ShoppingCategory = ({ category, banner }) => {
  const { all_product } = useContext(ShoppingContext);

  const [itemsToShow, setItemsToShow] = useState(3); 
  const itemsIncrement = 2;

  // Filter products based on the category
  const filteredProducts = all_product.filter(item => category === item.category);

  // Function to handle Load More button click
  const handleLoadMore = () => {
    setItemsToShow(prev => prev + itemsIncrement);
  };

  return (
    <div>
      <img src={banner} alt="Banner" className="shopping-category-banner" />
      <div className="shopping-category uni-padding">

        <FilterProduct filteredProducts={filteredProducts} totalProducts={all_product.length} />
        
        <div className="shopping-product">
          {filteredProducts.length > 0 ? (
            filteredProducts.slice(0, itemsToShow).map(item => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            ))
          ) : (
            <p className="product-not-found">Product not found.</p>
          )}
        </div>
        {itemsToShow < filteredProducts.length && (
          <button className="btn" onClick={handleLoadMore}>Load More</button>
        )}
      </div>
    </div>
  );
};

export default ShoppingCategory;

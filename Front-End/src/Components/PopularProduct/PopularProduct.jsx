import React, { useEffect, useState } from "react";
import "./PopularProduct.css";
import Item from "../Item/Item";

const PopularProduct = () => {
  const [popularProduct, setPopularProduct] = useState([]);

  // Get popular products from API
  useEffect(() => {
    fetch('http://localhost:5173/popularinwomen')
      .then(response => response.json())
      .then(data => setPopularProduct(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="popularProduct uni-padding">
      {popularProduct.length > 0 && (
        <div className="section-title">
          <h2>Popular In Women</h2>
          <h3>
            Check our <span>Popular Product</span>
          </h3>
          <p>
            Meet our amazing <span>Popular Product</span>
          </p>
        </div>
      )}
      <div className="popular-item">
        {popularProduct.map((item, index) => (
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
    </div>
  );
};

export default PopularProduct;

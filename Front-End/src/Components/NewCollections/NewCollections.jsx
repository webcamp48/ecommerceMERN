import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./NewCollections.css";

const NewCollections = () => {
  const [newCollections, setNewCollections] = useState([]);

  // Get New Collection Product From API
  useEffect(() => {
    fetch("http://localhost:5173/newcollection")
      .then((response) => response.json())
      .then((data) => {
        setNewCollections(data);  
      });
  }, []);

  return (
    <div className="newCollections uni-padding">
      <div className="section-title">
        <h2>New Collections</h2>
        <h3>
          Check our <span>New Collections</span>
        </h3>
        <p>
          Meet our amazing <span>New Collections</span>
        </p>
      </div>
      <div className="collection-item">
        {newCollections.map((item, index) => {
          return (
            <Item
              key={index}
              id={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;

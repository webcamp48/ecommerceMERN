// import React from "react";
// import data_product from "../../assets/Frontend_Assets/data";

// import Item from "../Item/Item";
// import "./RelatedProduct.css";

// const RelatedProduct = () => {
//   return (
//     <div className="relatedProduct uni-padding">
//       <div class="section-title">
//         <h2>Related Product</h2>
//         <h3>
//           Check our <span>Related Product</span>
//         </h3>
//         <p>
//           Meet our amazing <h2> Related Product</h2>
//         </p>
//       </div>
//       <div className="related-product-item">
//         {data_product.map((item, index) => {
//           return (
//             <Item
//               key={index}
//               id={item.id}
//               name={item.name}
//               image={item.image}
//               new_price={item.new_price}
//               old_price={item.old_price}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RelatedProduct;



import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./RelatedProduct.css";

const RelatedProduct = ({ product }) => {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  // Get related products from API
  useEffect(() => {
    if (product && product.category) { 
      fetch(`http://localhost:5173/relatedproducts/${product.category}`)
        .then(response => {
          if (!response.ok) { 
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) { 
            setRelatedProduct(data.products);
          } else {
            setError('Failed to fetch related products'); 
          }
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching data: ' + error.message); 
          setLoading(false); 
        });
    }
  }, [product]); 

  // // Display loading message while fetching data
  if (loading) { 
    return <div>Loading...</div>;
  }

  if (error) { 
    return <div>{error}</div>;
  }

  return (
    <div className="relatedProduct uni-padding">
      <div className="section-title">
        <h2>Related Product</h2>
        <h3>
          Check our <span>Related Product</span>
        </h3>
        <p>
          Meet our amazing <span>Related Product</span> 
        </p>
      </div>
      <div className="related-product-item">
        {relatedProduct.map((item, index) => (
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

export default RelatedProduct;

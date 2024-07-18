// import React, { useEffect, useState } from 'react';
// import './ListProduct.css';

// const ListProduct = () => {
//   const [allProducts, setAllProducts] = useState([]);


//   // fetchAllProducts
//   const fetchAllProducts = async () => {
//     try {
//       const res = await fetch("http://localhost:5173/allproducts");
//       const data = await res.json();
//       setAllProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // call once  fetchAllProducts
//   useEffect(() => {
//     fetchAllProducts();
//   }, []);


//   // deleteProduct
//   const deleteProduct = async (id) => {
//     try {
//       await fetch("http://localhost:5173/removeproduct", {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: id }),
//       });

//       // again call function for load data after remove product
//       await fetchAllProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div className='listProduct'>
//       <h1>List Product</h1>
//       <table className='listTable'>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Old Price</th>
//             <th>New Price</th>
//             <th>Category</th>
//             <th>Remove</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allProducts.length > 0 ? (
//             allProducts.map((product, index) => (
//               <tr key={index}>
//                 <td><img src={product.image} alt={product.name} className='product-image'/></td>
//                 <td>{product.name}</td>
//                 <td>{product.description}</td>
//                 <td>{product.old_price}</td>
//                 <td>{product.new_price}</td>
//                 <td>{product.category}</td>
//                 <td><button className='btn' onClick={() => deleteProduct(product.id)}>Remove</button></td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7" className='product-not-found' style={{marginTop:"40px"}}>No products found</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ListProduct;

import { FaEdit, FaTrash } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListProduct.css';

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:5173/allproducts");
      const data = await res.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch("http://localhost:5173/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      await fetchAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    navigate('/editproduct', { state: { product } });
  };

  return (
    <div className='listProduct'>
      <h1>List Product</h1>
      <table className='listTable'>
        <thead>
          <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Description</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Category</th>
            <th>Remove</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allProducts.length > 0 ? (
            allProducts.map((product, index) => (
              <tr key={index}>
                <td><img src={product.image} alt={product.name} className='product-image'/></td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.old_price}</td>
                <td>{product.new_price}</td>
                <td>{product.category}</td>
                <td><button className='btn' onClick={() => deleteProduct(product.id)}><FaTrash /></button></td>
                <td><button className='btn' onClick={() => handleEdit(product)}><FaEdit /></button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className='product-not-found' style={{marginTop:"40px"}}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;


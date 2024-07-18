import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditProduct.css';
import upload_area from '../../assets/Admin_Assets/upload_area.svg';

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    id: '',
    name: '',
    description: "",
    old_price: "",
    new_price: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    if (location.state && location.state.product) {
      setProductDetails(location.state.product);
    }
  }, [location]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const productChangeHandler = (e) => {
    setProductDetails({
      ...productDetails, 
      [e.target.name]: e.target.value
    });
  }

  const updateProductHandler = async () => {
    let responseData;
    let product = productDetails;

    if (image) {
      let formData = new FormData();
      formData.append('product', image);

      try {
        const response = await fetch("http://localhost:5173/upload",{
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        responseData = data;

        if (responseData.success) {
          product.image = responseData.image_url;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    try {
      const response = await fetch("http://localhost:5173/updateproduct", {
        method: 'POST',
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form and navigate to listproduct page
      setProductDetails({
        id: '',
        name: '',
        description: "",
        old_price: "",
        new_price: "",
        category: "",
        image: ""
      });
      setImage(false); // Clear image state
      navigate('/listproduct'); 

      const data = await response.json();
      alert('Product updated successfully:');
      console.log('Product updated successfully:', data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }

  return (
    <div className='editProduct'>
      <h2>Edit Product</h2>
      <div className="editproduct-itemfield">
        <label htmlFor="productName">Product Name</label>
        <input type="text" value={productDetails.name} onChange={productChangeHandler} name='name' id="productName" placeholder='Enter Product Name' />
      </div>
      <div className="editproduct-itemfield">
        <label htmlFor="productDescription">Product Description</label>
        <textarea name='description' value={productDetails.description} onChange={productChangeHandler} id="productDescription" placeholder='Enter Product Description'></textarea>
      </div>
      <div className="editproduct-price">
        <div className="editproduct-itemfield">
          <label htmlFor="oldPrice">Old Price</label>
          <input type="text" id="oldPrice" name='old_price' value={productDetails.old_price} onChange={productChangeHandler} placeholder='Enter Product Old Price' />
        </div>
        <div className="editproduct-itemfield">
          <label htmlFor="newPrice">New Price</label>
          <input type="text" id="newPrice" name='new_price' value={productDetails.new_price} onChange={productChangeHandler} placeholder='Enter Product New Price' />
        </div>
      </div>
      <div className="editproduct-itemfield">
        <label htmlFor="category">Product Category</label>
        <select name="category" className='category-selector' id="category" value={productDetails.category} onChange={productChangeHandler}>
          <option value="category">Select Product Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="editproduct-itemfield">
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : productDetails.image || upload_area} alt="upload image" className='editproduct-img-upload' />
        </label>
        <input type="file" onChange={imageHandler} name='image' id='file-input' hidden />
      </div>
      <button onClick={updateProductHandler} className='editproduct-btn btn'>Update Product</button>
    </div>
  )
}

export default EditProduct;

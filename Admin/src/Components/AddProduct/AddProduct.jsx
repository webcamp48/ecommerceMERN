// import React, { useState } from 'react';
// import './AddProduct.css';
// import upload_area from '../../assets/Admin_Assets/upload_area.svg';
// import { Form } from 'react-router-dom';

// const AddProduct = () => {
//     const [image, setImage] = useState(false);

//     const imageHandler = (e)=>{
//         setImage(e.target.files[0]);
//     }
//     const [productDetails, setProductDetails] = useState({
//         name: '',
//         description: "",
//         old_price: "",
//         new_price: "",
//         category: "",
//         image: ""

//     });
//     const productChangeHandler = (e)=>{
//         setProductDetails({
//             ...productDetails, 
//             [e.target.name]: e.target.value
//         });
//     }

//     const addProductHandler = async ()=>{
//         console.log(productDetails);

//         let responseData;
//         let product;
//         product = productDetails;

//         let formData = new FormData();
//         formData.append('product', image);

//         await fetch("http://localhost:5173/upload",{
//             method: 'POST',
//             headers: {
//                 Accept: "Application/json"
//             },
//             body: formData
//         }).then((resp)=> resp.json()).then((data) => {responseData = data})


//         if(responseData.success){
//             product.image = responseData.image_url;
//             console.log(product);
//             try {
//                 const response = await fetch("http://localhost:5173/addproduct", {
//                     method: 'POST',
//                     headers: {
//                         'Accept': 'application/json', 
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify(product)
//                 });
                
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
        
//                 const data = await response.json();
//                 alert('Product added successfully:');
//                 console.log('Product added successfully:', data);
//             } catch (error) {
//                 console.error('Error adding product:', error);
//             }
//         }
//         // clear form data after submit form
//         setProductDetails({
//             name: '',
//             description: "",
//             old_price: "",
//             new_price: "",
//             category: "",
//             image: ""
//         });
        
//     }

//   return (
//     <div className='addProduct'>
//       <h2>Add New Product</h2>
//       <div className="addproduct-itemfield">
//         <label htmlFor="productName">Product Name</label>
//         <input type="text" value={productDetails.name} onChange={productChangeHandler} name='name' id="productName" placeholder='Enter Product Name' />
//       </div>
//       <div className="addproduct-itemfield">
//         <label htmlFor="productDescription">Product Description</label>
//         <textarea name='description' value={productDetails.description} onChange={productChangeHandler} id="productDescription" placeholder='Enter Product Description'></textarea>
//       </div>
//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//             <label htmlFor="oldPrice">Old Price</label>
//             <input type="text"  id="oldPrice" name='old_price' value={productDetails.old_price} onChange={productChangeHandler} placeholder='Enter Product Old Price' />
//         </div>
//         <div className="addproduct-itemfield">
//             <label htmlFor="newPrice">New Price</label>
//             <input type="text" id="newPrice" name='new_price' value={productDetails.new_price} onChange={productChangeHandler} placeholder='Enter Product New Price' />
//         </div>
//     </div>
//         <div className="addproduct-itemfield">
//             <label htmlFor="category">Product Category</label>
//            <select name="category" className='category-selector' id="category" value={productDetails.category} onChange={productChangeHandler}>
//                 <option value="category">Select Product Category</option>
//                 <option value="men">Men</option>
//                 <option value="women">Women</option>
//                 <option value="kid">Kid</option>
//             </select>
//         </div>
//         <div className="addproduct-itemfield">
//             <label htmlFor='file-input'>
//                 <img src={image ? URL.createObjectURL(image) : upload_area} alt="upload image" className='addproduct-img-upload' />
//             </label>
//             <input type="file" onChange={imageHandler} name='image' id='file-input' hidden />
//         </div>
//       <button onClick={addProductHandler} className='addproduct-btn btn'>Add Product</button>
//     </div>
//   )
// }

// export default AddProduct;



import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/Admin_Assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    description: "",
    old_price: "",
    new_price: "",
    category: "",
    image: ""
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const productChangeHandler = (e) => {
    setProductDetails({
      ...productDetails, 
      [e.target.name]: e.target.value
    });
  }

  const addProductHandler = async () => {
    console.log(productDetails);

    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch("http://localhost:5173/upload",{
      method: 'POST',
      headers: {
        Accept: "Application/json"
      },
      body: formData
    }).then((resp) => resp.json()).then((data) => {responseData = data})


    
    if(responseData.success){
      product.image = responseData.image_url;
      console.log(product);
      try {
        const response = await fetch("http://localhost:5173/addproduct", {
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

        const data = await response.json();
        alert('Product added successfully:');
        console.log('Product added successfully:', data);
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
    // clear form data after submit form
    setProductDetails({
      name: '',
      description: "",
      old_price: "",
      new_price: "",
      category: "",
      image: ""
    });
  }

  return (
    <div className='addProduct'>
      <h2>Add New Product</h2>
      <div className="addproduct-itemfield">
        <label htmlFor="productName">Product Name</label>
        <input type="text" value={productDetails.name} onChange={productChangeHandler} name='name' id="productName" placeholder='Enter Product Name' />
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="productDescription">Product Description</label>
        <textarea name='description' value={productDetails.description} onChange={productChangeHandler} id="productDescription" placeholder='Enter Product Description'></textarea>
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <label htmlFor="oldPrice">Old Price</label>
          <input type="text" id="oldPrice" name='old_price' value={productDetails.old_price} onChange={productChangeHandler} placeholder='Enter Product Old Price' />
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="newPrice">New Price</label>
          <input type="text" id="newPrice" name='new_price' value={productDetails.new_price} onChange={productChangeHandler} placeholder='Enter Product New Price' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="category">Product Category</label>
        <select name="category" className='category-selector' id="category" value={productDetails.category} onChange={productChangeHandler}>
          <option value="category">Select Product Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
          <img src={image ? URL.createObjectURL(image) : upload_area} alt="upload image" className='addproduct-img-upload' />
        </label>
        <input type="file" onChange={imageHandler} name='image' id='file-input' hidden />
      </div>
      <button onClick={addProductHandler} className='addproduct-btn btn'>Add Product</button>
    </div>
  )
}

export default AddProduct;


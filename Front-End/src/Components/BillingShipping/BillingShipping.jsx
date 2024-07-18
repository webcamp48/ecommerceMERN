// import React from 'react';
// import './BillingShipping.css';
// import {FaShippingFast } from 'react-icons/fa';

// const BillingShipping = () => {
//   return (
//     <div className='billing_shipping uni-padding'>
//       <div className="billing_shipping_header">
//         <h1><span><FaShippingFast /></span>Billing & Shipping Information</h1>
//       </div>
//       <div className="billing_shippting_details">
//         <div className="billing_shipping_name">
//           <label htmlFor="">Name</label>
//           <input type="text" />
//         </div>
//         <div className="billing_shipping_name">
//           <label htmlFor="">Your Phone</label>
//           <input type="text" />
//         </div>
//         <div className="billing_shipping_name">
//           <label htmlFor="">Address</label>
//           <textarea name="" rows={10} id=""></textarea>
//         </div>
//         <div className="billing_shipping_name">
//           <label htmlFor="">City</label>
//          <select name="" id="">
//           <option value="">Select City</option>
//           <option value="">Lahore</option>
//           <option value="">Karachi</option>
//           <option value="">Sharaqpur</option>
//          </select>
//         </div>
//         <div className="billing_shipping_btn">
//           <button className='btn'>Submit Details</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BillingShipping



import React, { useState } from 'react';
import './BillingShipping.css';
import { FaShippingFast } from 'react-icons/fa';

const BillingShipping = () => {
  const [formData, setFormData] = useState({
    userId: '123456789987654321123456', 
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/submitshipping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Server response:', data);

      alert('Shipping information submitted successfully');
    } catch (error) {
      console.error('Error submitting shipping information:', error.message);
      alert('Error submitting shipping information. Please try again later.');
    }
  };

  return (
    <div className="billing_shipping uni-padding">
      <div className="billing_shipping_header">
        <h1>
          <span>
            <FaShippingFast />
          </span>
          Billing & Shipping Information
        </h1>
      </div>
      <div className="billing_shipping_details">
        <div className="billing_shipping_name">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="billing_shipping_name">
          <label htmlFor="phone">Your Phone</label>
          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="billing_shipping_name">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" rows={10} value={formData.address} onChange={handleChange}></textarea>
        </div>
        <div className="billing_shipping_name">
          <label htmlFor="city">City</label>
          <select id="city" name="city" value={formData.city} onChange={handleChange}>
            <option value="">Select City</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
            <option value="Sharaqpur">Sharaqpur</option>
          </select>
        </div>
        <div className="billing_shipping_btn">
          <button className="btn" onClick={handleSubmit}>
            Submit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingShipping;

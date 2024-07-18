import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import './Breadcrum.css'; 

const Breadcrum = ({ product }) => {
  return (
    <div className='breadcrum uni-padding'>
      <Link to="/">Home</Link> <FaAngleRight className='greater-icon'/>
      <Link to="/shopping">Shopping</Link> <FaAngleRight className='greater-icon' />
      <span className="active">{product.category}</span> <FaAngleRight className='greater-icon'/>
      <span className="active">{product.name}</span>
    </div>
  );
}

export default Breadcrum;

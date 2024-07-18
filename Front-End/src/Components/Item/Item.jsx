import React from 'react';
import { motion } from 'framer-motion';
import './Item.css';
import { Link } from 'react-router-dom';
import RatingStars from '../RatingStars/RatingStars';

const Item = ({ id, name, description, image, new_price, old_price }) => {
  return (
    <motion.div 
      className='item' 
      key={id}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
    >
      <Link to={`/product/${id}`}><img onClick={() => window.scroll(0, 0)} src={image} alt="product" /></Link>
      <h5>{name}</h5>
      <RatingStars rating={3.5} />
      {/* <p>{description}</p> */}
      <div className="item-prices">
        <div className="item-price-new">${new_price}</div>
        <div className="item-price-old">${old_price}</div>
      </div>
    </motion.div>
  );
}

export default Item;

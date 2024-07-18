import React, { useContext } from 'react';
import './ProductDetails.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { ShoppingContext } from '../../Contexts/ShoppingContext';

const ProductDetails = (props) => {
  const { product } = props;
 const {addToCart} = useContext(ShoppingContext)
  return (
    <div className='productDetails uni-padding'>
      <div className="productDetails-left">
        <div className="product-image-list">
          <img src={product.image} alt="product image" />
          <img src={product.image} alt="product image" />
          <img src={product.image} alt="product image" />
          <img src={product.image} alt="product image" />
          
        </div>
        <div className="product-image">
        <img src={product.image} className='productDetails-main-img' alt="product image" />
        </div>
      </div>
      <div className="productDetails-right">
        <h1>{product.name}</h1>
        
        <div className="productDetails-right-rating">
          <FaStar className="star filled-star" />
          <FaStar className="star filled-star" />
          <FaStar className="star filled-star" />
          <FaRegStar className="star dull-star" />
          <p>(101)</p>
        </div>
        <span>In Stock</span>
        <div className="productDetails-right-price">
          <p className="productDetails-right-price-old">${product.old_price}</p>
          <p className="productDetails-right-price-new">${product.new_price}</p>
        </div>
        <div className="productDetails-right-description">
        {product.description}
        </div>
        <div className="productDetails-right-size">
          <h3>Size</h3>
          <div className="productDetails-right-size-list">
            <button className='btn'>XS</button>
            <button className='btn'>S</button>
            <button className='btn'>M</button>
            <button className='btn'>L</button>
          </div>
          <button onClick={()=> {addToCart(product.id)}} className='btn addCart'>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

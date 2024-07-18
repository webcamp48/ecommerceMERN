import React, { useContext } from 'react';
import './CartTotalAmount.css';
import { ShoppingContext } from "../../Contexts/ShoppingContext";
import { Link } from 'react-router-dom';

const CartTotalAmount = () => {
  const { getTotalCartAmount, shippingAmount } = useContext(ShoppingContext);

  return (
    <div className='cartTotalAmount uni-padding'>
      <div className="cart-subTotal">
        <p>Subtotal</p>
        <p>${getTotalCartAmount()}.00</p>
      </div>
      <div className="cart-shipping">
        <p>Shipping</p>
        <p>${shippingAmount}.00</p>
      </div>
      <div className="cart-total">
        <p>Grand Total</p>
        <p>${getTotalCartAmount() + shippingAmount}.00</p>
      </div>
      <div className="cart-checkout-btn">
        <Link to={'/checkout'}><button className='btn'>PROCEED TO CHECKOUT</button></Link>
      </div>

    </div>
  )
}

export default CartTotalAmount

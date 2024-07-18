import React, { useContext } from "react";
import { ShoppingContext } from "../../Contexts/ShoppingContext";
import { FaTimes } from "react-icons/fa";
import "./CartItem.css";

const CartItem = () => {

  const { all_product, cartItem, removeFromCart } = useContext(ShoppingContext);

  return (
    <div className="cartItem uni-padding">
      <div className="section-title">
        <h2>Cart Item</h2>
        <h3>Check Your <span>Cart Item</span></h3>
      </div>
      <table className="cartTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {all_product.map((product, index) => {
            if (cartItem[product.id] > 0) {
              return (
                <tr key={index}>
                  <td>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="cartitem-img"
                    />
                  </td>
                  <td className="cartitem-title">{product.name}</td>
                  <td className="cartitem-price">${product.new_price}</td>
                  <td className="cartitem-quantity">
                    <input
                      type="number"
                      min="1"
                      max="1000"
                      className="quantity-input"
                      value={cartItem[product.id]}
                      readOnly 
                    />
                  </td>
                  <td className="cartitem-total">${product.new_price * cartItem[product.id]}</td>
                  <td className="cartitem-remove">
                    <button className="btn cartbtn" onClick={() => removeFromCart(product.id)}>
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              );
            } else {
              return null; 
            }
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CartItem;

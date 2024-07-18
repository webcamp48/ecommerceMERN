import React from "react";
import { FaCreditCard } from "react-icons/fa";
import "./PaymentMethod.css";

const PaymentMethod = () => {
  return (
    <div className="payment_method uni-padding">
      <div className="payment_method_header">
        <h1>
          <span>
            <FaCreditCard />
          </span>
          Payment Method
        </h1>
      </div>
      <div className="payment_method_select">
        <select name="payment_method" id="payment_method">
          <option value="">Select Payment Method</option>
          <option value="cod">COD</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>

        </select>
      </div>
      <div className="payment_details_main">
        <div className="payment_method_details">
          <p>Bank Name : Muhammad Ali</p>
          <p>Account Number : 123456789</p>
          <p>Branch Name : Meezan Bank Sharaqpur</p>
          <p>Country : Pakistan</p>
        </div>
        <div className="payment_method_transaction">
          <h3>Transaction Information</h3>
          <p>(Including Transaction Id and Other Information Correctly.)</p>
          <textarea name="" rows={7} id=""></textarea>
        </div>
        <div className="payment_method_btn">
          <button className="btn">Send Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;

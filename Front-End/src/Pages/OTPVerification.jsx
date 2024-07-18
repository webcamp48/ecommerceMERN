import React, { useState } from 'react';
import './CSS/OTPVerification.css';

const OTPVerification = ({ onVerify, onResendOTP }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp.join(""));
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit}>
        <h3>Verify</h3>
        <p>Your code was sent to you via email</p>
        <div className="otp-inputs">
          {otp.map((data, index) => {
            return (
              <input
                className="otp-field"
                type="text"
                name="otp"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            );
          })}
        </div>
        <button type="submit" className="verify-btn btn">Verify</button>
        <p className="resend-text">Didn't receive code? <a href="#" onClick={onResendOTP}>Request again</a></p>
      </form>
    </div>
  );
};

export default OTPVerification;

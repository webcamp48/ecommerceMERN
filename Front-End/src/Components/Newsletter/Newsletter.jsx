import React, { useState } from 'react';
import './Newsletter.css'; 

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    alert(`Subscribed with email: ${email}`);
    setEmail(''); 
  };

  return (
    <div className="newsletter-container">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with our latest news, products, and promotions.</p>
      <form onSubmit={handleSubmit} className="newsletter-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button className='btn' type="submit">Subscribe</button>
      </form>
    </div>
  );
}

export default Newsletter;

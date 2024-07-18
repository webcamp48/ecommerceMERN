import React from 'react';
import './Footer.css'; 
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { NavLink,Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer uni-pading">
      <div className="footer-top">
        <div className="footer-section">
          <h2>Software Pro</h2>
          <ul>
          <Link to={'/about'}><li><a href="#">About Us</a></li></Link>
          <Link to={'/contact'}><li><a href="#">Contact Us</a></li></Link>
          <Link to={'/terms'}><li><a href="#">Terms of Service</a></li></Link>
          <Link to={'/privacy'}><li><a href="#">Privacy Policy</a></li></Link>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Categories</h2>
          <ul>
          <li><NavLink to = '/'>Home</NavLink> </li>
            <li><NavLink to = '/mens'>Men's Shirts</NavLink> </li>
            <li><NavLink to = '/womens'>Women's Shirts</NavLink> </li>
            <li><NavLink to = '/kids'>Kid's Shirts</NavLink> </li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Connect With Us</h2>
          <div className="social-icons">
            <Link><FaFacebook /></Link>
            <Link><FaTwitter /></Link>
            <Link><FaInstagram /></Link>

          </div>
        </div>
        <div className="footer-section" style={{lineHeight:'1.5rem'}}>
          <h2>Address</h2>
          <p>T&T Software, Lahore, Pakistan</p>
          <p>Email: softwarepro@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>&copy; 2024 Software Pro Company. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

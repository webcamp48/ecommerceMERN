import React, { useState, useContext } from 'react';
import './NavBar.css';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingContext } from '../../Contexts/ShoppingContext';
import SearchBar from './../SearchBar/SearchBar';
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [menu, setMenu] = useState('');
  // State to manage menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { getTotalCartItemCount } = useContext(ShoppingContext);

  // handleMenuToggle
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='NavBar uni-padding'>
      <div className='nav-logo'>
        <h1>Ecommerce-Site</h1>
      </div>

      <ul className={`nav-menu ${isMenuOpen && 'open'}`}>
        <li onClick={() => setMenu('shoppings')}><NavLink to='/'>Home</NavLink> {menu === 'shoppings' && <hr />}</li>
        <li onClick={() => setMenu('mens')}><NavLink to='/mens'>Mens</NavLink> {menu === 'mens' && <hr />}</li>
        <li onClick={() => setMenu('womens')}><NavLink to='/womens'>Womens</NavLink> {menu === 'womens' && <hr />}</li>
        <li onClick={() => setMenu('kids')}><NavLink to='/kids'>Kids</NavLink> {menu === 'kids' && <hr />}</li>
      </ul>
      
      <SearchBar />
      
      <div className="nav-cart-login">
        {localStorage.getItem('auth-token') ? (
          <button className='btn' onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/login"); }}>Logout</button>
        ) : (
          <Link to='/login'><button className='btn'>Login</button></Link>
        )}
        <Link to='/cart' className='cart-icon'><FaShoppingCart size={26} /></Link>
        <Link to='/cart'><div className='nav-cart-counter'>{getTotalCartItemCount()}</div></Link>
      </div>

      <div className='nav-menu-toggle' onClick={handleMenuToggle}>
        {isMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>
      
      <div className="auth0-data">
        {isLoading ? (
          <p>Loading...</p> 
        ) : isAuthenticated ? (
          <>
            <h4>{user.name}</h4>
            <img src={user.picture} alt="User Avatar" /> 
          </>
        ) : null}
      </div>
    </div>
  );
}

export default NavBar;

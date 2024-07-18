import React from 'react';
import './NavBar.css';
import profile from '../../assets/Admin_Assets/profile.png'

const NavBar = () => {
  return (
    <div className='NavBar uni-padding'>
      <div className="navbar-left">
        <h1>Admin Panel</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-profile">
            <img src={profile} alt="" />
            <p>Admin</p>
        </div>
      </div>
    </div>
  )
}

export default NavBar

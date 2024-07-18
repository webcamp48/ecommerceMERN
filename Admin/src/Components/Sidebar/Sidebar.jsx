import React from "react";
import "./Sidebar.css";
import { FaEdit, FaList, FaPlusCircle } from 'react-icons/fa';


import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={'/addproduct'}>
        <div className="sidebar-item">
          <FaPlusCircle />
          <p>Add Product</p>
        </div>
      </Link>
      <hr />
      <Link to={'/editproduct'}>
        <div className="sidebar-item">
          <FaEdit />
          <p>Edit Product </p>
        </div>
      </Link>
      <hr />
      <Link to={'/listproduct'}>
        <div className="sidebar-item">
          <FaList />
          <p>Product List</p>
        </div>
      </Link>
      <hr />
    </div>
  );
};

export default Sidebar;

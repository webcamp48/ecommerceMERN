import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import EditProduct from '../../Components/EditProduct/EditProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import WellcomePage from '../../Components/WellcomePage/WellcomePage';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
      <Route path='/' element={<WellcomePage />} />
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/editproduct' element={<EditProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
      </Routes>
    </div>
  )
}

export default Admin;

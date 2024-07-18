import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Shoppings from './Pages/Shoppings';
import ShoppingCategory from './Pages/ShoppingCategory';
import Products from './Pages/Products';
import LoginSignUp from './Pages/LoginSignUp';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './assets/Frontend_Assets/banner_mens.png';
import women_banner from './assets/Frontend_Assets/banner_women.png';
import kid_banner from './assets/Frontend_Assets/banner_kids.png';
import CheckoutProduct from './Pages/CheckoutProduct';
import SearchResults from './Components/SearchResults/SearchResults';
import FilterOldToNew from './Components/FilterOldToNew/FilterOldToNew';


// import banner category
const App = () => {
  return (
    <div>

      {/* set a Routing pages */}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element = {<Shoppings />} />
          <Route path='/mens' element = {<ShoppingCategory  category = {'men'} banner={men_banner}/>} />
          <Route path='/womens' element = {<ShoppingCategory category = {'women'} banner={women_banner}/>} />
          <Route path='/kids' element = {<ShoppingCategory category = {'kid'} banner={kid_banner}/>} />

          <Route path='/product' element={<Products />}>
            <Route path=':productId'  element={<Products />}/>
          </Route>

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignUp />} />
          <Route path='/checkout' element={<CheckoutProduct />} />

          <Route path='/searchresult' element={<SearchResults />} />
          <Route path='/oldtonew' element={<FilterOldToNew />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </div>
  )
}

export default App

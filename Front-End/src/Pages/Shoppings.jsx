import React from 'react'
import Hero from '../Components/Hero/Hero'
import PopularProduct from '../Components/PopularProduct/PopularProduct'
import NewCollections from '../Components/NewCollections/NewCollections'
import Newsletter from './../Components/Newsletter/Newsletter';

const Shoppings = () => {
  return (
    <div>
      <Hero />
      <PopularProduct />
      <NewCollections />
      <Newsletter />
    </div>
  )
}

export default Shoppings

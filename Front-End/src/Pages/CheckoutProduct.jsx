import React from 'react'
import OrderDetails from '../Components/OrderDetails/OrderDetails'
import BillingShipping from '../Components/BillingShipping/BillingShipping'
import PaymentMethod from '../Components/PaymentMethod/PaymentMethod'

const CheckoutProduct = () => {
  return (
    <div className='checkoutProduct'>
      <OrderDetails />
      <BillingShipping />
      <PaymentMethod />      
    </div>
  )
}

export default CheckoutProduct

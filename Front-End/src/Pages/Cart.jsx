
import CartItem from '../Components/CartItem/CartItem'
import CartTotalAmount from '../Components/CartTotalAmount/CartTotalAmount'

const Cart = () => {
  return (
    <div className='cart'>
      <CartItem />
      <CartTotalAmount />
    </div>
  )
}

export default Cart

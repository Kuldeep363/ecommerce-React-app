import React from 'react'
import { Link } from 'react-router-dom'
import EmptyCartImg from '../../assets/images/empty-cart.webp'

const EmptyCart = () => {
  const closeCart = ()=>{
    document.getElementById('cart__icon').click()
  }
  return (
    <div id='empty__cart'>
            <img src={EmptyCartImg} alt="Empty Cart" />
            <h3>Your cart is empty</h3>
            <p>Looks like you have not added anything to the cart.</p>
            <Link className='add__to__cart' to='/search' onClick={()=>closeCart()}>
                Search products
            </Link>
    </div>
  )
}

export default EmptyCart
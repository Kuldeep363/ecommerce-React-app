import React, { useEffect, useState } from 'react'
import { CartState } from '../../App';
import CartProduct from './cartProduct'
import EmptyCart from './emptyCart'

function Cart({showCart}) {
    const [subTotal, setSubTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [deliveryCharges, setDeliveryCharges] = useState(0);

    const {state} = CartState()
    useEffect(()=>{
        let cost = state.cart.reduce((prev, curr)=>{
            prev += curr.price *curr.quantity
            return prev
        },0)
        setSubTotal(cost)

        setTax(Math.ceil(0.18*cost))
        if(cost<500){
            setDeliveryCharges(40)
        }else{
            setDeliveryCharges(0)
        }
    },[state])
  return (
    <div id='cart' style={{right:showCart?'0':'-100vw'}}>
        <h3>Your Cart</h3>
        <div id="cart__items">
            {
                state.cart.length===0?
                <EmptyCart/>
                :
                <div className="cart__products">
                    {
                        state.cart.map((product)=>{
                            return (
                                <CartProduct key={product.id} id={product.id}  title={product.title} img={product.img} price={product.price} quantity={product.quantity} />
                            )
                        })
                    }
                    <div className="cart__calculation">
                        <div className="product__calculation">
                            <div className="price__title">
                                <small>Sub Total</small>
                            </div>
                            <div>
                                <b>
                                ${subTotal}
                                </b>
                            </div>
                        </div>
                        <div className="product__calculation">
                            <div className="price__title">
                                <small>Delivery Charges</small>
                                <br />
                                {
                                    deliveryCharges!==0?
                                    <small className='very__small green'>(Add ${500-subTotal} items to avail free delivery)</small>
                                    :null
                                }
                            </div>
                            <div>
                                {
                                    deliveryCharges !== 0?
                                    <b>${deliveryCharges}</b>
                                    :
                                    <>
                                        <b>
                                        $0
                                        </b>
                                        <strike>$40</strike>
                                    </>
                                 }
                            </div>
                        </div>
                        <div className="product__calculation">
                            <div className="price__title">
                                <small>Tax (GST%)</small>
                            </div>
                            <div>
                                <b>
                                ${tax}
                                </b> <small>(18%)</small>
                            </div>
                        </div>
                    </div>
                    <div className="cart__calculation total__price">
                        <div className="product__calculation">
                            <div className="price__title">
                                <small>Total</small>
                            </div>
                            <div>
                                <b>
                                    ${subTotal+deliveryCharges+tax}
                                </b>
                            </div>
                        </div>

                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Cart
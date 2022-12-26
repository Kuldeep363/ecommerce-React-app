import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartState } from "../../App";
import Logo from '../../assets/images/kr-logo.png';
const Cart = lazy(()=>import("../cart/cart"));

const Header = () => {
  const [numberOfCartItems, setNumbeOfCartItems] = useState(0)
  const [showCart, setShowCart] = useState(false)

  const categories = [
    "Smartphones",
    "Laptops",
    "Fragrances",
    "Skincare",
    "Home-decoration",
    "Furniture",
    "Womens-dresses",
    "Womens-shoes",
    "Mens-shirts",
    "Mens-shoes",
    "Mens-watches",
    "Womens-watches",
    "Womens-bags",
    "Womens-jewellery"
  ]

  const {state} = CartState();
  // let count = 
  useEffect(()=>{
    setNumbeOfCartItems(state.cart.length)
  },[state.cart])
  return ( 
    <div className="d-flex justify-between" id="header">
      <div className="d-flex" id="nav__icons">
        <div className="logo">
          <Link to='/'>
            <img src={Logo} alt="Kuldeep Rawat" />
          </Link>
        </div>
        <div className="navbar__links">
            <div id="categ">
              <div >Categories</div>
              <div id="categories__link">
                {
                  categories.map((c,i)=>{
                    return (
                        <Link key={i} to={`/category/${c}`} >{c}</Link>
                    )
                  })
                }
              </div>
            </div>
            <div>
              <Link to='/search'>Search</Link>
            </div>
        </div>
      </div>
      <div className="cart__icon" id='cart__icon' onClick={()=>setShowCart(!showCart)}>
        <span role='img' aria-label='icon'>🛒</span>
        {
          state.cart.length>0 &&
        <p className="cart__items__number">{numberOfCartItems}</p>
        }
      </div>
      <Suspense>
        <Cart showCart={showCart} />
      </Suspense>
    </div>
  );
};

export default Header;

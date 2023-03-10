import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { lazy, Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartState } from "../../App";
import Logo from '../../assets/images/logo.webp';
import DeleteDialog from '../extraComponents/DeleteDialog';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import UserAvatar from '../../assets/images/user.jpg';
const Cart = lazy(()=>import("../cart/cart"));

const Header = () => {
  const [numberOfCartItems, setNumbeOfCartItems] = useState(0)
  const [showCart, setShowCart] = useState(false)
  const [dialog, setShowDialog] = useState(false)

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

  const toggleDialog = ()=>{
    setShowDialog(!dialog)
  }
  
  useEffect(()=>{
    setNumbeOfCartItems(state.cart.products.length)
  },[state.cart])
  return ( 
    <div className="d-flex justify-between" id="header">
      <div className="d-flex" id="nav__icons">
        <div className="logo">
          <Link to='/'>
            <img src={Logo} alt="Kuldeep Rawat" width='40px' />
          </Link>
        </div>
        <div className="navbar__links">
            <div id="categ">
              <div>Categories</div>
              <KeyboardArrowDownRoundedIcon/>
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
              <Link to='/search'><SearchRoundedIcon/></Link>
            </div>
        </div>
      </div>
      <div className="d-flex" style={{'alignItems':'center','gap':'15px'}}>
        <div className='auth__btns'>
          {
            state.user?
            <div id='user__header'>
              <img src={state.user.image!==''?state.user.image:UserAvatar} alt='User avatar' width='30px' height='30px' />
              <div id="account__actions">
                <Link to='/user'>
                  <div>
                      <AccountBoxIcon fontSize='smaller'/>
                      <p>
                        Account
                      </p>
                  </div>
                </Link>
                <div className='logout__btn' onClick={()=>toggleDialog()}>
                  <LogoutIcon fontSize='smaller'/>
                  <p>Logout</p>
                </div>
              </div>
            </div>
            :
            <Link to='/auth/login' className='login__btn'>Login</Link>
          }
        </div> 
        <div className="cart__icon" id='cart__icon' onClick={()=>setShowCart(!showCart)}>
          <ShoppingCartOutlinedIcon />
          {
            state.cart.products.length>0 &&
          <p className="cart__items__number">{numberOfCartItems}</p>
          }
        </div>
      </div>
      <Suspense>
        <Cart showCart={showCart} />
      </Suspense>
      {
        dialog &&
        <DeleteDialog toggleDialog={toggleDialog}/>

      }
    </div>
  );
};

export default Header;

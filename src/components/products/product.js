import { useNavigate } from "react-router-dom";
import { CartState } from "../../App";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

const Product = ({id, title, img, price, rating }) => {
  
  const navigate = useNavigate()
  const {state,dispatch} = CartState()

  const addToCart = (e)=>{
    e.stopPropagation()
    dispatch({
      type:'ADD_TO_CART',
      payload:{
        id,
        title,
        img,
        price,
        quantity:1
      }
    })
  }
  const removeFromCart = (e)=>{
    e.stopPropagation()
    
    dispatch({
      type:'REMOVE_FROM_CART',
      payload:{
        id
      }
    })
  }

  const navigateToProduct = ()=>{
    navigate(`/product/${id}/${title}`)
  }

  return (
    <div className='product' onClick={()=>navigateToProduct()}>
      <div className="product__img">
        <img src={img} alt={title} />
      </div>
        <div className="product__data">
          <div className='d-flex justify-between'>
            <h5>{title}</h5>
            <small className="product__rating">
              <StarRateRoundedIcon/>
              <span>
                {(Math.round((rating*10))/10).toFixed(1)}
              </span>
            </small>
          </div> 
            <p>${price}</p>
        </div>
        <div className="product__data">
          {
            state.cart.products.some(product=>product.id===id)?
              <div className="remove__from__cart" onClick={(e)=>removeFromCart(e)}>
                <RemoveShoppingCartOutlinedIcon/>
                <span>
                  Remove from cart
                </span>
              </div>
            :
            <div className="add__to__cart" onClick={(e)=>addToCart(e)}>
              <AddShoppingCartOutlinedIcon/>
              <span>
                Add to cart
              </span>
            </div>
          }
        </div>
    </div>
  );
};
export default Product;

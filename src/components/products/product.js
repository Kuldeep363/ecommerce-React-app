import { useNavigate } from "react-router-dom";
import { CartState } from "../../App";

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
      {/* {
        recommended?
        null
        :
        <> */}
        <div className="product__data">
          <div className='d-flex justify-between'>
            <h3>{title}</h3>
            <p>⭐{(Math.round((rating*10))/10).toFixed(1)}</p>
          </div> <br />
            <p>${price}</p>
        </div>
        <div className="product__data">
          {
            state.cart.some(product=>product.id===id)?
              <div className="remove__from__cart" onClick={(e)=>removeFromCart(e)}>
                Remove from cart
              </div>
            :
            <div className="add__to__cart" onClick={(e)=>addToCart(e)}>
              Add to cart
            </div>
          }
        </div>
        {/* </>
      } */}
    </div>
  );
};
export default Product;

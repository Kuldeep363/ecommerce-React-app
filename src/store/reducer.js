const reducer = (state,action)=>{
    let cart;
    switch (action.type){
        case "ADD_TO_CART":
            cart = {cart:[...state.cart,{...action.payload}]}
            localStorage.setItem('cart',JSON.stringify(cart))
            return cart
            
        case "REMOVE_FROM_CART":
            cart = {cart:[...state.cart.filter(product=>product.id!==action.payload.id)]}
            localStorage.setItem('cart',JSON.stringify(cart))
            return cart
            
        case 'REMOVE_ONE':
            cart = {
                cart:
                [
                    ...state.cart.map((product)=>{
                        if(product.id === action.payload.id){
                            product.quantity -=1
                        }
                        return product
                    })
                ]
            }
            localStorage.setItem('cart',JSON.stringify(cart))
            return cart

        case 'CHANGE_QUANTITY':
            cart = {
                cart:[
                    ...state.cart.filter((product)=>(
                        product.id === action.payload.id?
                            product.quantity = action.payload.quantity
                            :product.quantity
                        
                    ))
                ]
            }
            localStorage.setItem('cart',JSON.stringify(cart))
            return cart

        default:
            return state
    }
}

export default reducer
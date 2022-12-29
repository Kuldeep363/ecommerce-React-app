import { CartState } from "../App";


const Auth = ()=> {
    const {state} = CartState();
    return state.user !== null?true:false
}

export default Auth
import React from 'react'
import { useNavigate } from 'react-router';
import { CartState } from '../App';
import LoginForm from '../components/login/loginForm';

const Login = () => {
    const {state} = CartState();
    const navigation = useNavigate();
    if(state.user){
        navigation('/')
    }else{
  return (
    <div className='login mt padding'>
        <h3 className='login__h3'>Login</h3>
        <div className="d-flex justify-center">
            <LoginForm/>
        </div>
    </div>
  )
    }
}

export default Login
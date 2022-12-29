import React from 'react'
import { useNavigate } from 'react-router';
import LoginForm from '../components/login/loginForm';
import Auth from '../store/Authenticate';

const Login = () => {
    const isAuthenticated = Auth()
    const navigation = useNavigate();
    if(isAuthenticated){
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
import React, { useState } from 'react'
import { CartState } from '../../App';

const DeleteDialog = ({toggleDialog}) => {
    const [show, setShow] = useState(false);
    const {dispatch} = CartState();

    const closeDialog = (e)=>{
        e.stopPropagation()
        if(e.target.id === 'delete__dialog' || e.target.id === 'cancel__btn'){
            toggleDialog()
        }
    }

    const logout = (e)=>{
        e.stopPropagation()
        dispatch({
          type:'LOGOUT',
        })
        toggleDialog()
      }

  return (
    <div className='d-flex justify-center align-center' id='delete__dialog' onClick={(e)=>closeDialog(e)}>
        <div className="wrapper">
            <h3>Do you really want to logout?</h3>
            <div className="d-flex">
                <button id='cancel__btn'>Cancel</button>
                <button className='remove' onClick={(e)=>logout(e)}>Logout</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteDialog
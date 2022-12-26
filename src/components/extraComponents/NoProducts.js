import React from 'react'
import { Link } from 'react-router-dom'
import NoProductsImg from '../../assets/images/no-product-found.png'

const NoProducts = ({searchPage=true}) => {
  return (
    <div className="d-flex justify-center ">
        <div id='no__product' className='search__form'>
            <img src={NoProductsImg} alt="No products! --by  kuldeep rawat" />
            <h3>No products found...</h3>
            <p>Search for the products you want.</p>
            {
                searchPage ?
                null:
                <Link className='add__to__cart' to='/search'>
                    Search products
                </Link>
            }
        </div>
    </div>
  )
}

export default NoProducts

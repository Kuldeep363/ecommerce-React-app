import React, { lazy, Suspense, useState } from 'react'
const Loading = lazy(()=>import('../components/extraComponents/Loading'));
const NoProducts = lazy(()=>import('../components/extraComponents/NoProducts'));
const Product = lazy(()=>import( '../components/products/product'));

const Search = () => {
    let [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])
    const [msg, setMsg] = useState('');

    const searchProducts = async()=>{
        const res = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        const data = await res.json();

        if(data && data.total>0){
            setProducts(data.products)
        }else if(data.total === 0){
            setMsg('No products found...')
        }
        setLoading(false);

    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(searchQuery !==''){
            setProducts([])
            setLoading(true);
            searchProducts();
        }
    }

  return (
    <Suspense>

        <div className='mt padding'>
            <div className='d-flex justify-center'>
                <div className="search__form">
                    <form onSubmit={(e)=>handleSubmit(e)} >
                        <div className="input">
                            <input type="text" autoFocus={true}  value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Serach phone, laptop, Skincare...' />
                        </div>
                        <button>Search</button>
                    </form>
                </div>
            </div>
            {
            loading?
            <Loading/>
            :
            products.length>0 ?
            <div className="product__listing">
            {
                products.map((product)=>{
                    return (
                    <Product key={product.id} id={product.id} title={product.title} img={product.thumbnail} price={product.price} rating={product.rating} />
                    )
                })
            }
            </div>
            :
            (
                msg === ''?
                null
                :
                <NoProducts/>
            )
        }
        </div>
    </Suspense>
  )
}

export default Search

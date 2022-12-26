import React, { lazy, Suspense } from 'react'
import Banner from '../components/banner/banner'
const ProductListing = lazy(()=>import('../components/products/productListing'))

const Home = () => {
  return (
    <div>
        <Banner/>
        <Suspense fallback={<>Loading...</>}>
          <ProductListing/>
        </Suspense>
    </div>
  )
}

export default Home
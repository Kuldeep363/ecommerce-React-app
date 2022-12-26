import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { createContext, lazy, Suspense, useContext, useReducer } from "react";
import "./styles.css";
import reducer from "./store/reducer";
const Home = lazy(()=>import("./pages/Home"));
const Category = lazy(()=>import("./pages/Category"));
const Search = lazy(()=> import("./pages/Search"));
const ProductDetails = lazy(()=> import("./components/products/productDetails"));

let CartContext = createContext();

export default function App() {

  let cart = JSON.parse(localStorage.getItem('cart'))
  if(!cart){
    cart = []
  }else{
    cart = cart.cart
  }
  const [state, dispatch] = useReducer(reducer,{cart:cart})
  
  return (
    <div>
      <CartContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
        <Header />
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/category/:category" element={<Category/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/product/:id/:title" element={<ProductDetails/>}/>
            </Routes>
        </Suspense>
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export const CartState = ()=>{
  return useContext(CartContext);
}
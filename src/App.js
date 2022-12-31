import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import ScrollToTop from "./components/extraComponents/ScrollToTop";
import { createContext, lazy, Suspense, useContext, useReducer } from "react";
import "./styles.css";
import reducer from "./store/reducer";
import Login from "./pages/Login";
import UserAccount from "./pages/UserAccount";
import CheckoutPage from "./pages/CheckoutPage";
const Home = lazy(()=>import("./pages/Home"));
const Category = lazy(()=>import("./pages/Category"));
const Search = lazy(()=> import("./pages/Search"));
const ProductDetails = lazy(()=> import("./components/products/productDetails"));

let CartContext = createContext();

export default function App() {

  let data = JSON.parse(localStorage.getItem('data'))
  if(!data){
    data = {
      "user":null,
      "cart" :{
        'products':[],
        'totalPrice':0
      }
    }
  }else{
    data = {
      "user":data.user,
      "cart" :data.cart
    }
  }

  const [state, dispatch] = useReducer(reducer,data)
  
  return (
    <div>
      <CartContext.Provider value={{state, dispatch}}>
        <BrowserRouter>
        <ScrollToTop/>
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/category/:category" element={<Category/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/product/:id/:title" element={<ProductDetails/>}/>

                <Route path="/auth/login" element={<Login/>}/>
                <Route path="/user" element={<UserAccount/>}/>
                <Route path="/checkout" element={<CheckoutPage/>}/>
            </Routes>
        </Suspense>
        <Header />
        </BrowserRouter>
      </CartContext.Provider>
    </div>
  );
}

export const CartState = ()=>{
  return useContext(CartContext);
}
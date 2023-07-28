import React, { useEffect } from 'react';
import Home from './pages/Home';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Route
} from "react-router-dom";
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Protected from './features/auth/components/Protected';
import ProductDetailPage from './pages/ProductDetailPage';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home></Home>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginPage></LoginPage>
    ),
  },
  {
    path: "/signup",
    element: (
      <SignupPage></SignupPage>
    ),
  },
  {
    path: "/cart",
    element: (
      <Protected><CartPage></CartPage></Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected><Checkout></Checkout></Protected>
    ),
  },
  {
    path: "/product_detail/:id",
    element: (
      <Protected><ProductDetailPage></ProductDetailPage></Protected>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path: "*",
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByIdAsync(user.id));
    }
  },[user]);
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

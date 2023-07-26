import React from 'react';
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
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

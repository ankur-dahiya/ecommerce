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
      <CartPage></CartPage>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Checkout></Checkout>
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

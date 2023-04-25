import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './components/Home/Home.jsx'
import Cart from './components/Cart/Cart.jsx'
import Products from './components/Products/Products.jsx'
import Categories from './components/Categories/Categories.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import jwtDecode from 'jwt-decode'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { CartContextProvider } from './Context/CartContext.js'
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './components/Checkout/Checkout.jsx'
import { Offline, Online } from "react-detect-offline";
import { CategoryContextProvider } from './Context/CategoryContext.js'
import SubCategories from './components/SubCategories/SubCategories.jsx'
import SubCategory from './components/SubCategory/SubCategory.jsx'
import Brands from './components/Brands/Brands.jsx'
import { BrandsContextProvider } from './Context/BrandsContext.js'
import SpecificBrand from './components/SpecificBrand/SpecificBrand.jsx'
import { WishlistContextProvider } from './Context/WishlistContext.js'
import Wishlist from './components/Wishlist/Wishlist.jsx'
import MyAccount from './components/MyAccount/MyAccount.jsx'
import UpdateUser from './components/UpdateUser/UpdateUser.jsx'
import { UpdateUserContextProvider } from './Context/UpdateUserContext.js'
import UpdatePassword from './components/UpdatePassword/UpdatePassword.jsx'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.jsx'
import VerifyCode from './components/VerifyCode/VerifyCode.jsx'
import ResetPassword from './components/ResetPassword/ResetPassword.jsx'


export default function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encoded = localStorage.getItem(`userToken`);
    let decoded = jwtDecode(encoded);
    setUserData(decoded);
  }

  useEffect(() => {
    if (localStorage.getItem(`userToken`) !== null) {
      saveUserData();
    }
  }, [])


  let routers = createBrowserRouter([
    {
      path: '', element: <Layout setUserData={setUserData} userData={userData} />, children: [
        { index: true, element: <Home /> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'products', element: <Products /> },
        { path: 'categories', element: <Categories /> },
        { path: 'brands', element: <Brands /> },
        { path: '/specificbrand/:id', element: <SpecificBrand /> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },
        { path: 'productdetails/:id', element: <ProductDetails /> },
        { path: '/specificcategory/:id', element: <SubCategory /> },
        { path: 'subcategories', element: <SubCategories /> },
        { path: 'myaccount', element: <MyAccount /> },
        { path: 'updateuserdata', element: <UpdateUser /> },
        { path: 'updatepassword', element: <UpdatePassword /> },
        { path: 'forgotpassword', element: <ForgotPassword /> },
        { path: 'verifyresetcode', element: <VerifyCode /> },
        { path: 'resetpassword', element: <ResetPassword /> },
        { path: '*', element: <NotFound /> },

      ]
    }
  ])


  return (
    <>
      <CartContextProvider>
        <UpdateUserContextProvider>
          <WishlistContextProvider>
            <BrandsContextProvider>
              <CategoryContextProvider>
                <Offline><div className='network'>You're offline</div> </Offline>
                <Toaster />
                <RouterProvider router={routers}></RouterProvider>
              </CategoryContextProvider>
            </BrandsContextProvider>
          </WishlistContextProvider>
        </UpdateUserContextProvider>
      </CartContextProvider>
    </>
  )
}
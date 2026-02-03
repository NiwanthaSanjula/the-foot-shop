import React from 'react'
import { Toaster } from 'react-hot-toast'
import ShopLayout from './components/layout/ShopLayout'
import { Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Home from './pages/shop/Home'
import Login from './pages/auth/Login'
import Shop from './pages/shop/Shop'
import ProductDetails from './pages/shop/ProductDetails'
import AboutUs from './pages/shop/AboutUs'
import ContactUs from './pages/shop/ContactUs'
import Cart from './pages/shop/Cart'
import MyOrders from './pages/shop/MyOrders'
import Profile from './pages/shop/Profile'
import Auth from './pages/auth/Login'
import { AdminRoute, ProtectedRoute } from './components/layout/ProtectedRoute'
import ForgotPassword from './pages/auth/ForgotPassword'
import GuestOrders from './pages/shop/GuestOrders'
import WishList from './pages/shop/WishList'
import Orders from './pages/admin/Orders'
import AddProduct from './pages/admin/AddProduct'
import AllProducts from './pages/admin/AllProducts'
import AllUsers from './pages/admin/AllUsers'
import Verify from './pages/shop/Verify'


const App = () => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

      <Routes>
        {/*PUBLIC SHOP ROUTES */}
        <Route path='/' element={<ShopLayout />}>
          < Route index element={<Home />} />
          < Route path="shop" element={<Shop />} />
          < Route path="product/:productId" element={<ProductDetails />} />
          < Route path="about-us" element={<AboutUs />} />
          < Route path="contact-us" element={<ContactUs />} />
          < Route path="cart" element={<Cart />} />
          < Route path="guest-orders" element={<GuestOrders />} />
          <Route path="verify" element={<Verify />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/reset-password' element={<ForgotPassword />} />

          {/*Protected routes*/}
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <WishList />
              </ProtectedRoute>
            }
          />
        </Route>


        {/*ADMIN DASHBOARD ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          < Route index element={<Dashboard />} />
          < Route path="users" element={<AllUsers />} />
          < Route path="orders" element={<Orders />} />
          < Route path="add-product" element={<AddProduct />} />
          < Route path="all-products" element={<AllProducts />} />
        </Route>

      </Routes>

    </>
  )
}

export default App

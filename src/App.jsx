import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Notfound from './components/Notfound/Notfound'
import Product from './components/Product/Product'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import AuthContextProvider from './context/AuthContextProvider'
import ProtectedRouting from './components/ProtectedRouting/ProtectedRouting'
import Category from './components/Category/Category'
import Brands from './components/Brands/Brands'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import UpdatePassword from './components/UpdatePassword/UpdatePassword'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CartContextProvider from './context/CartContextProvider'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

// Create router configuration
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRouting>
            <Home />
          </ProtectedRouting>
        )
      },
      {
        path: "Product",
        element: (
          <ProtectedRouting>
            <Product />
          </ProtectedRouting>
        )
      },
      {
        path: "Cart",
        element: (
          <ProtectedRouting>
            <Cart />
          </ProtectedRouting>
        )
      },
      {
        path: "Brands",
        element: (
          <ProtectedRouting>
            <Brands />
          </ProtectedRouting>
        )
      },
      {
        path: "ProductDetails/:id",
        element: (
          <ProtectedRouting>
            <ProductDetails />
          </ProtectedRouting>
        )
      },
      {
        path: "Category",
        element: (
          <ProtectedRouting>
            <Category />
          </ProtectedRouting>
        )
      },
      {
        path: "Login",
        element: <Login />
      },
      {
        path: "ForgetPassword",
        element: <ForgetPassword />
      },
      {
        path: "UpdatePassword",
        element: <UpdatePassword />
      },
      {
        path: "Register",
        element: <Register />
      },
      {
        path: "*",
        element: <Notfound />
      }
    ]
  }
])

export default function App() {
  return (
    <ErrorBoundary>
      <AuthContextProvider>
        <CartContextProvider>
          <RouterProvider router={router} />
        </CartContextProvider>
      </AuthContextProvider>
    </ErrorBoundary>
  )
}
 
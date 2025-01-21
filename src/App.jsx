import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Notfound from './components/Notfound/Notfound'
import Product from './components/Product/Product'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

export default function App() {
let router= createBrowserRouter([
    {
      path:"",element:<Layout/>,children:[
        {index:true,element:<Home/>},
        {path:"Product",element:<Product/>},
        {path:"Cart",element:<Cart/>},
        {path:"Login",element:<Login/>},
        {path:"Register",element:<Register/>},
        {path:"*",element:<Notfound/>},
      ]
    }
  ])
 
  return (
    <>
    <RouterProvider router={router}></RouterProvider>
    </>
  )
}
 
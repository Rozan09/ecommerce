import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logoImg from '../../assets/images/freshcart-logo.svg'
export default function Navbar() {
  return (
    

<nav className="bg-white border-gray-200 shadow ">
  <div className="max-w-screen-xl justify-between flex flex-wrap items-center mx-auto p-4">
    <div className="hidden w-full md:flex md:w-auto" id="navbar-default">
     <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logoImg} className="h-8" alt="" />
    </Link>
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink
          to="/" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink
          to="/Product" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Products</NavLink>
        </li>
        <li>
          <NavLink
          to="/Cart" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Cart</NavLink>
        </li>
        <li>
          <NavLink
          to="/Brands" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Brands</NavLink>
        </li>
        <li>
          <NavLink
          to="/Category" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Category</NavLink>
        </li>
      </ul>
    </div>  
    <div className="flex">
    <div className="icons pt-2">
    <i className="fa-brands px-2 fa-facebook"></i>
    <i className="fa-brands px-2 fa-twitter"></i>
    <i className="fa-brands px-2 fa-instagram"></i>
    <i className="fa-brands px-2 fa-youtube"></i>
    </div>
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <NavLink
          to="/Login" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Login</NavLink>
        </li>
        <li>
          <NavLink
          to="/Register" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Register</NavLink>
        </li>
        <li>
          <NavLink
          to="/Logout" 
          className={(x)=>x.isActive ? "block py-2 px-3 text-active" : "block py-2 px-3"} 
          aria-current="page">Logout</NavLink>
        </li>
      </ul>
    </div>
     <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
</nav>

  )
}

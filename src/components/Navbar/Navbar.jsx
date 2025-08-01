import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import logoImg from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../../context/AuthContextProvider'
import { CartContext } from '../../context/CartContextProvider'

export default function Navbar() {
  const { token, setToken } = useContext(AuthContext)
  const { numsCartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    navigate('/login')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Check if we're on login or register page
  const isLoginActive = location.pathname === '/Login'
  const isRegisterActive = location.pathname === '/Register'

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="" className="flex items-center space-x-3">
            <img src={logoImg} className="h-8 w-auto" alt="FreshCart Logo" />
            {/* <span className="text-xl font-bold text-gray-900 hidden sm:block">FreshCart</span> */}
          </Link>

          {/* Desktop Navigation */}
          {token && (
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-[--main-color] border-b-2 border-[--main-color]' 
                      : 'text-gray-700 hover:text-[--main-color]'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/Product"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-[--main-color] border-b-2 border-[--main-color]' 
                      : 'text-gray-700 hover:text-[--main-color]'
                  }`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/Category"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-[--main-color] border-b-2 border-[--main-color]' 
                      : 'text-gray-700 hover:text-[--main-color]'
                  }`
                }
              >
                Categories
              </NavLink>
              <NavLink
                to="/Brands"
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-[--main-color] border-b-2 border-[--main-color]' 
                      : 'text-gray-700 hover:text-[--main-color]'
                  }`
                }
              >
                Brands
              </NavLink>
            </div>
          )}

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Social Icons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-instagram text-sm"></i>
              </a>
            </div>

            {/* Cart Icon */}
            {token && (
              <Link to="/Cart" className="relative p-2 text-gray-700 hover:text-[--main-color] transition-colors">
                <i className="fa-solid fa-cart-shopping text-lg"></i>
                {numsCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {numsCartItems}
                  </span>
                )}
              </Link>
            )}

            {/* Auth Buttons */}
            {token ? (
              <button
                onClick={logout}
                className="hidden md:block text-sm font-medium text-gray-700 hover:text-[--main-color] transition-colors"
              >
                Logout
              </button>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                {/* Login Button - Styled box when active */}
                <NavLink
                  to="/Login"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-200 ${
                      isActive || isLoginActive
                        ? 'bg-[--main-color] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[--main-color-dark]'
                        : 'text-gray-700 hover:text-[--main-color]'
                    }`
                  }
                >
                  Login
                </NavLink>
                
                {/* Register Button - Styled box when active */}
                <NavLink
                  to="/Register"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-200 ${
                      isActive || isRegisterActive
                        ? 'bg-[--main-color] text-white px-4 py-2 rounded-md shadow-sm hover:bg-[--main-color-dark]'
                        : 'text-gray-700 hover:text-[--main-color]'
                    }`
                  }
                >
                  Register
                </NavLink>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[--main-color] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[--main-color]"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {/* Mobile Navigation Links */}
            {token && (
              <>
                <NavLink
                  to="/"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[--main-color] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/Product"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[--main-color] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </NavLink>
                <NavLink
                  to="/Category"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[--main-color] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </NavLink>
                <NavLink
                  to="/Brands"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[--main-color] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Brands
                </NavLink>
                <NavLink
                  to="/Cart"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[--main-color] hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cart ({numsCartItems})
                </NavLink>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[--main-color] hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </>
            )}

            {/* Mobile Auth Links */}
            {!token && (
              <>
                <NavLink
                  to="/Login"
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium transition-all duration-200 rounded-md ${
                      isActive || isLoginActive
                        ? 'bg-[--main-color] text-white'
                        : 'text-gray-700 hover:text-[--main-color] hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/Register"
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium transition-all duration-200 rounded-md ${
                      isActive || isRegisterActive
                        ? 'bg-[--main-color] text-white'
                        : 'text-gray-700 hover:text-[--main-color] hover:bg-gray-50'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Mobile Social Icons */}
            <div className="flex space-x-4 px-3 py-2">
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

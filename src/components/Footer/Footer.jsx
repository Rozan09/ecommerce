import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">FreshCart</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted destination for quality products and exceptional shopping experiences. 
              We bring you the best deals with fast delivery and excellent customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/Product" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/Category" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/Brands" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-[--main-color] transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[--main-color] focus:border-transparent text-sm bg-gray-800 text-gray-200"
              />
              <button className="px-4 py-2 bg-[--main-color] text-white rounded-r-md hover:bg-green-600 transition-colors text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} FreshCart. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[--main-color] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

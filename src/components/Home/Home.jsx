import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'

export default function Home() {
  const [productList, setProductList] = useState(null)
  const [numPages, setNumPages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [error, setError] = useState(null)

  const { addUserCart, setNumsCartItems } = useContext(CartContext)

  const getAllProduct = async (page = 1) => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?limit=10&page=${page}`
      )
      setProductList(response.data.data)
      
      const pages = []
      for (let i = 1; i <= response.data.metadata.numberOfPages; i++) {
        pages.push(i)
      }
      setNumPages(pages)
      setCurrentPage(page)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProduct()
  }, [])

  const handlePageChange = (page) => {
    getAllProduct(page)
  }

  const addCart = async (id) => {
    try {
      const response = await addUserCart(id)
      setNumsCartItems(response.data.numOfCartItems)
      toast.success('Product added to cart successfully!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add product to cart')
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="loader mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => getAllProduct()}
            className="bg-[--main-color] text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50">
        <MainSlider />
        <CategorySlider />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
            <p className="text-gray-600">Discover our latest collection of premium products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productList?.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
                <Link to={`/ProductDetails/${product._id}`}>
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.imageCover} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                      alt={product.title}
                      loading="lazy"
                    />
                    {product.ratingsAverage > 4 && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        <i className="fas fa-star mr-1"></i>
                        Top Rated
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        {product.category.name}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-[--main-color]">
                        {formatPrice(product.price)}
                      </span>
                      <div className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        <span className="text-sm text-gray-600">{product.ratingsAverage}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="px-4 pb-4">
                  <button 
                    onClick={() => addCart(product._id)} 
                    className="w-full bg-[--main-color] text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {numPages && numPages.length > 1 && (
            <div className="mt-12">
              <nav className="flex justify-center">
                <ul className="flex items-center space-x-1">
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-chevron-left"></i>
                    </button>
                  </li>
                  
                  {numPages.map((page) => (
                    <li key={page}>
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 text-sm font-medium border ${
                          currentPage === page
                            ? 'bg-[--main-color] text-white border-[--main-color]'
                            : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  
                  <li>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === numPages.length}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

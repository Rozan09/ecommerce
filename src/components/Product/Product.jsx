import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../Loading/Loading'

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export default function Product() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('products') // products, details
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'title'
  })

  const { productId } = useParams()

  // Fetch all products with pagination and filters
  const fetchProducts = async (page = 1, filters = {}) => {
    try {
      setLoading(true)
      let url = `${BASE_URL}/products?page=${page}&limit=12`
      
      // Add filters to URL
      if (filters.search) url += `&title[regex]=${filters.search}&title[options]=i`
      if (filters.category) url += `&category=${filters.category}`
      if (filters.brand) url += `&brand=${filters.brand}`
      if (filters.minPrice) url += `&price[gte]=${filters.minPrice}`
      if (filters.maxPrice) url += `&price[lte]=${filters.maxPrice}`
      if (filters.sortBy) url += `&sort=${filters.sortBy}`

      const response = await axios.get(url)
      setProducts(response.data.data)
      setTotalPages(response.data.metadata.numberOfPages)
      setCurrentPage(page)
      setError(null)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products')
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Fetch specific product
  const fetchSpecificProduct = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/products/${id}`)
      setSelectedProduct(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching specific product:', error)
      setError('Failed to load product details')
      toast.error('Failed to load product details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts(1, filters)
  }, [filters])

  useEffect(() => {
    if (productId) {
      fetchSpecificProduct(productId)
    }
  }, [productId])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setActiveTab('details')
  }

  const handleBackToProducts = () => {
    setSelectedProduct(null)
    setActiveTab('products')
  }

  const handlePageChange = (page) => {
    fetchProducts(page, filters)
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts(1, filters)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(price)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return <Loading text="Loading products..." />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null)
              fetchProducts(1, filters)
            }}
            className="bg-[--main-color] text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600 mt-1">Discover our amazing product collection</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'products'
                    ? 'bg-white text-[--main-color] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Products
              </button>
              {selectedProduct && (
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'details'
                      ? 'bg-white text-[--main-color] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Product Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="md:col-span-2 block lg:col-span-4">
                  <button type="submit" className="btn">
                    <i className="fas fa-search mr-2"></i>
                    Search Products
                  </button>
                </div>
              </form>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
              <span className="text-sm text-gray-500">{products.length} products</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.ratingsAverage > 4 && (
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        <i className="fas fa-star mr-1"></i>
                        Top Rated
                      </div>
                    )}
                    {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        Sale
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-2">
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {product.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                    
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {product.priceAfterDiscount && product.priceAfterDiscount < product.price ? (
                          <>
                            <span className="text-lg font-bold text-[--main-color]">
                              {formatPrice(product.priceAfterDiscount)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-[--main-color]">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        <span className="text-sm text-gray-600">{product.ratingsAverage}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>ID: {product._id}</span>
                      <span className="text-[--main-color] font-medium">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium border ${
                        currentPage === page
                          ? 'bg-[--main-color] text-white border-[--main-color]'
                          : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        )}

        {activeTab === 'details' && selectedProduct && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Product Details</h2>
              <button
                onClick={handleBackToProducts}
                className="text-sm text-[--main-color] hover:text-[--main-color-dark] font-medium"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Back to Products
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div>
                  <img
                    src={selectedProduct.imageCover}
                    alt={selectedProduct.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                
                {/* Product Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedProduct.title}</h3>
                    <p className="text-gray-600">Product ID: {selectedProduct._id}</p>
                  </div>
                  
                  {/* Price Information */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold text-gray-900">Price</h4>
                    <div className="flex items-center space-x-4">
                      {selectedProduct.priceAfterDiscount && selectedProduct.priceAfterDiscount < selectedProduct.price ? (
                        <>
                          <span className="text-3xl font-bold text-[--main-color]">
                            {formatPrice(selectedProduct.priceAfterDiscount)}
                          </span>
                          <span className="text-xl text-gray-500 line-through">
                            {formatPrice(selectedProduct.price)}
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                            Sale
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl font-bold text-[--main-color]">
                          {formatPrice(selectedProduct.price)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <i className="fas fa-star text-yellow-400 mr-1"></i>
                      <span className="font-medium">{selectedProduct.ratingsAverage}</span>
                    </div>
                    <span className="text-gray-500">({selectedProduct.ratingsQuantity} reviews)</span>
                  </div>
                  
                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description || 'No description available'}
                    </p>
                  </div>
                  
                  {/* Category and Brand */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Category</h5>
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {selectedProduct.category?.name || 'Uncategorized'}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1">Brand</h5>
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {selectedProduct.brand?.name || 'No Brand'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Additional Information */}
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Stock:</span>
                        <span className="text-gray-600 ml-2">{selectedProduct.quantity} units</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Sold:</span>
                        <span className="text-gray-600 ml-2">{selectedProduct.sold || 0} units</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Created:</span>
                        <span className="text-gray-600 ml-2">{formatDate(selectedProduct.createdAt)}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Updated:</span>
                        <span className="text-gray-600 ml-2">{formatDate(selectedProduct.updatedAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="border-t pt-6">
                    <div className="flex space-x-4">
                      <button
                        onClick={handleBackToProducts}
                        className="btn-secondary"
                      >
                        <i className="fas fa-arrow-left mr-2"></i>
                        Back to Products
                      </button>
                      <button className="btn">
                        <i className="fas fa-shopping-cart mr-2"></i>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
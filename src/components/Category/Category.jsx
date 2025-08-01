import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../Loading/Loading'

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export default function Category() {
  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('categories') // categories, subcategories, details

  const { categoryId, subcategoryId } = useParams()

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/categories`)
      setCategories(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching categories:', error)
      setError('Failed to load categories')
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  // Fetch all subcategories
  const fetchSubcategories = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/subcategories`)
      setSubcategories(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching subcategories:', error)
      setError('Failed to load subcategories')
      toast.error('Failed to load subcategories')
    } finally {
      setLoading(false)
    }
  }

  // Fetch specific category
  const fetchSpecificCategory = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/categories/${id}`)
      setSelectedCategory(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching specific category:', error)
      setError('Failed to load category details')
      toast.error('Failed to load category details')
    } finally {
      setLoading(false)
    }
  }

  // Fetch specific subcategory
  const fetchSpecificSubcategory = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/subcategories/${id}`)
      setSelectedSubcategory(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching specific subcategory:', error)
      setError('Failed to load subcategory details')
      toast.error('Failed to load subcategory details')
    } finally {
      setLoading(false)
    }
  }

  // Fetch subcategories for a specific category
  const fetchCategorySubcategories = async (categoryId) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/categories/${categoryId}/subcategories`)
      setSubcategories(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching category subcategories:', error)
      setError('Failed to load category subcategories')
      toast.error('Failed to load category subcategories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (categoryId) {
      fetchSpecificCategory(categoryId)
    }
  }, [categoryId])

  useEffect(() => {
    if (subcategoryId) {
      fetchSpecificSubcategory(subcategoryId)
    }
  }, [subcategoryId])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setActiveTab('details')
    fetchCategorySubcategories(category._id)
  }

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory)
    setActiveTab('details')
  }

  const handleViewSubcategories = (categoryId) => {
    setActiveTab('subcategories')
    fetchCategorySubcategories(categoryId)
  }

  if (loading) {
    return <Loading text="Loading categories..." />
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
              fetchCategories()
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
              <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
              <p className="text-gray-600 mt-1">Explore our product categories and subcategories</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('categories')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'categories'
                    ? 'bg-white text-[--main-color] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Categories
              </button>
              <button
                onClick={() => setActiveTab('subcategories')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'subcategories'
                    ? 'bg-white text-[--main-color] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Subcategories
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">All Categories</h2>
              <span className="text-sm text-gray-500">{categories.length} categories</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-[--main-color] rounded-lg flex items-center justify-center">
                        <i className="fas fa-tag text-white text-lg"></i>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleViewSubcategories(category._id)
                        }}
                        className="text-sm text-[--main-color] hover:text-[--main-color-dark] font-medium"
                      >
                        View Subcategories
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[--main-color] transition-colors">
                      {category.name}
                    </h3>
                    
                    {category.image && (
                      <div className="mb-4">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>ID: {category._id}</span>
                      <span className="text-[--main-color] font-medium">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'subcategories' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Subcategories</h2>
              <button
                onClick={() => setActiveTab('categories')}
                className="text-sm text-[--main-color] hover:text-[--main-color-dark] font-medium"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Back to Categories
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subcategories.map((subcategory) => (
                <div
                  key={subcategory._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <i className="fas fa-layer-group text-white text-lg"></i>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[--main-color] transition-colors">
                      {subcategory.name}
                    </h3>
                    
                    {subcategory.image && (
                      <div className="mb-4">
                        <img
                          src={subcategory.image}
                          alt={subcategory.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {subcategory.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>ID: {subcategory._id}</span>
                      <span className="text-[--main-color] font-medium">
                        <i className="fas fa-chevron-right"></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'details' && (selectedCategory || selectedSubcategory) && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                {selectedCategory ? 'Category Details' : 'Subcategory Details'}
              </h2>
              <button
                onClick={() => setActiveTab('categories')}
                className="text-sm text-[--main-color] hover:text-[--main-color-dark] font-medium"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Back to Categories
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {selectedCategory && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-[--main-color] rounded-lg flex items-center justify-center">
                      <i className="fas fa-tag text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h3>
                      <p className="text-gray-600">Category ID: {selectedCategory._id}</p>
                    </div>
                  </div>
                  
                  {selectedCategory.image && (
                    <div className="max-w-md">
                      <img
                        src={selectedCategory.image}
                        alt={selectedCategory.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">
                      {selectedCategory.description || 'No description available'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Created:</span>
                      <span className="text-gray-600 ml-2">
                        {new Date(selectedCategory.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Updated:</span>
                      <span className="text-gray-600 ml-2">
                        {new Date(selectedCategory.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedSubcategory && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="fas fa-layer-group text-white text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedSubcategory.name}</h3>
                      <p className="text-gray-600">Subcategory ID: {selectedSubcategory._id}</p>
                    </div>
                  </div>
                  
                  {selectedSubcategory.image && (
                    <div className="max-w-md">
                      <img
                        src={selectedSubcategory.image}
                        alt={selectedSubcategory.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-600">
                      {selectedSubcategory.description || 'No description available'}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Created:</span>
                      <span className="text-gray-600 ml-2">
                        {new Date(selectedSubcategory.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Updated:</span>
                      <span className="text-gray-600 ml-2">
                        {new Date(selectedSubcategory.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

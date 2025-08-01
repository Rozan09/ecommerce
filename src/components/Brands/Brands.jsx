import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../Loading/Loading'

const BASE_URL = 'https://ecommerce.routemisr.com/api/v1'

export default function Brands() {
  const [brands, setBrands] = useState([])
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('brands') // brands, details

  const { brandId } = useParams()

  // Fetch all brands
  const fetchBrands = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/brands`)
      setBrands(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching brands:', error)
      setError('Failed to load brands')
      toast.error('Failed to load brands')
    } finally {
      setLoading(false)
    }
  }

  // Fetch specific brand
  const fetchSpecificBrand = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`${BASE_URL}/brands/${id}`)
      setSelectedBrand(response.data.data)
      setError(null)
    } catch (error) {
      console.error('Error fetching specific brand:', error)
      setError('Failed to load brand details')
      toast.error('Failed to load brand details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBrands()
  }, [])

  useEffect(() => {
    if (brandId) {
      fetchSpecificBrand(brandId)
    }
  }, [brandId])

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand)
    setActiveTab('details')
  }

  const handleBackToBrands = () => {
    setSelectedBrand(null)
    setActiveTab('brands')
  }

  if (loading) {
    return <Loading text="Loading brands..." />
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
              fetchBrands()
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
              <h1 className="text-3xl font-bold text-gray-900">Brands</h1>
              <p className="text-gray-600 mt-1">Discover our trusted brand partners</p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('brands')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'brands'
                    ? 'bg-white text-[--main-color] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Brands
              </button>
              {selectedBrand && (
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'details'
                      ? 'bg-white text-[--main-color] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Brand Details
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'brands' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">All Brands</h2>
              <span className="text-sm text-gray-500">{brands.length} brands</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brands.map((brand) => (
                <div
                  key={brand._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleBrandClick(brand)}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-[--main-color] rounded-lg flex items-center justify-center">
                        <i className="fas fa-crown text-white text-lg"></i>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        Brand
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[--main-color] transition-colors">
                      {brand.name}
                    </h3>
                    
                    {brand.image && (
                      <div className="mb-4">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm mb-4">
                      {brand.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>ID: {brand._id}</span>
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

        {activeTab === 'details' && selectedBrand && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Brand Details</h2>
              <button
                onClick={handleBackToBrands}
                className="text-sm text-[--main-color] hover:text-[--main-color-dark] font-medium"
              >
                <i className="fas fa-arrow-left mr-1"></i>
                Back to Brands
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-[--main-color] rounded-lg flex items-center justify-center">
                    <i className="fas fa-crown text-white text-2xl"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedBrand.name}</h3>
                    <p className="text-gray-600">Brand ID: {selectedBrand._id}</p>
                  </div>
                </div>
                
                {selectedBrand.image && (
                  <div className="max-w-md">
                    <img
                      src={selectedBrand.image}
                      alt={selectedBrand.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">
                    {selectedBrand.description || 'No description available'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Created:</span>
                    <span className="text-gray-600 ml-2">
                      {new Date(selectedBrand.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Updated:</span>
                    <span className="text-gray-600 ml-2">
                      {new Date(selectedBrand.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                {/* Additional Brand Information */}
                <div className="border-t pt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Brand Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Brand Name</h5>
                      <p className="text-gray-600">{selectedBrand.name}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-900 mb-2">Brand ID</h5>
                      <p className="text-gray-600 font-mono text-sm">{selectedBrand._id}</p>
                    </div>
                    {selectedBrand.slug && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Slug</h5>
                        <p className="text-gray-600">{selectedBrand.slug}</p>
                      </div>
                    )}
                    {selectedBrand.website && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-medium text-gray-900 mb-2">Website</h5>
                        <a 
                          href={selectedBrand.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[--main-color] hover:text-[--main-color-dark] underline"
                        >
                          {selectedBrand.website}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="border-t pt-6">
                  <div className="flex space-x-4">
                    <button
                      onClick={handleBackToBrands}
                      className="btn-secondary"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      Back to Brands
                    </button>
                    {selectedBrand.website && (
                      <a
                        href={selectedBrand.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                      >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        Visit Website
                      </a>
                    )}
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

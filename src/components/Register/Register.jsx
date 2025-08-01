import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters')
      .max(20, 'Name must be less than 20 characters'),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        'Password must contain at least one number and one special character'
      ),
    rePassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^(20)?01[1250][0-9]{8}$/, 'Please enter a valid Egyptian phone number')
  })

  const initialValues = {
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegister
  })

  async function handleRegister(values) {
    setLoading(true)
    
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        values
      )

      if (response.data.message === 'success') {
        toast.success('Registration successful! Please sign in.')
        navigate('/Login')
      }
    } catch (error) {
      console.error('Registration error:', error)
      
      const errorMessage = error.response?.data?.message || 
        error.response?.data?.error || 
        'Registration failed. Please try again.'
      
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img 
            src="/src/assets/images/freshcart-logo.svg" 
            alt="FreshCart Logo" 
            className="h-12 w-auto"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link 
            to="/Login" 
            className="font-medium text-[--main-color] hover:text-[--main-color-dark] transition-colors"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`form-input ${
                    formik.touched.name && formik.errors.name 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="Enter your full name"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="form-error">{formik.errors.name}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`form-input ${
                    formik.touched.email && formik.errors.email 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="Enter your email"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="form-error">{formik.errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={`form-input ${
                    formik.touched.phone && formik.errors.phone 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="Enter your phone number"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="form-error">{formik.errors.phone}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  className={`form-input pr-10 ${
                    formik.touched.password && formik.errors.password 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                </button>
                {formik.touched.password && formik.errors.password && (
                  <p className="form-error">{formik.errors.password}</p>
                )}
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="rePassword" className="form-label">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="rePassword"
                  name="rePassword"
                  type={showRePassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                  className={`form-input pr-10 ${
                    formik.touched.rePassword && formik.errors.rePassword 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowRePassword(!showRePassword)}
                >
                  <i className={`fas ${showRePassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                </button>
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <p className="form-error">{formik.errors.rePassword}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading || !(formik.isValid && formik.dirty)}
                className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="loader w-4 h-4 mr-2"></div>
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

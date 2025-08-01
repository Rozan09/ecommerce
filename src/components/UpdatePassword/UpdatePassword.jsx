import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'

export default function UpdatePassword() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    newPassword: Yup.string()
      .required('New password is required')
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        'Password must contain at least one number and one special character'
      )
  })

  const initialValues = {
    email: '',
    newPassword: ''
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleUpdatePassword
  })

  async function handleUpdatePassword(values) {
    setLoading(true)
    
    try {
      const response = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        values
      )

      if (response.data.token) {
        toast.success('Password updated successfully!')
        navigate('/')
      }
    } catch (error) {
      console.error('Update password error:', error)
      
      const errorMessage = error.response?.data?.message || 
        error.response?.data?.error || 
        'Failed to update password. Please try again.'
      
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
          Update your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email and new password to complete the reset process.
          <br />
          <Link 
            to="/Login" 
            className="font-medium text-[--main-color] hover:text-[--main-color-dark] transition-colors"
          >
            Back to sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
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
                  placeholder="Enter your email address"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="form-error">{formik.errors.email}</p>
                )}
              </div>
            </div>

            {/* New Password Field */}
            <div>
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  className={`form-input pr-10 ${
                    formik.touched.newPassword && formik.errors.newPassword 
                      ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                      : ''
                  }`}
                  placeholder="Enter your new password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400 hover:text-gray-600`}></i>
                </button>
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <p className="form-error">{formik.errors.newPassword}</p>
                )}
              </div>
            </div>

            {/* Password Requirements */}
            <div className="p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800 font-medium mb-2">Password Requirements:</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• At least 6 characters long</li>
                <li>• Contains at least one number</li>
                <li>• Contains at least one special character (!@#$%^&*)</li>
              </ul>
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
                    Updating password...
                  </>
                ) : (
                  'Update password'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import toast, { Toaster } from 'react-hot-toast'

export default function ForgetPassword() {
  const [loading, setLoading] = useState(false)
  const [formDisplay, setFormDisplay] = useState(true)
  const navigate = useNavigate()

  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address')
  })

  const codeValidationSchema = Yup.object({
    resetCode: Yup.string()
      .required('Reset code is required')
      .min(6, 'Reset code must be at least 6 characters')
  })

  const emailForm = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: emailValidationSchema,
    onSubmit: handleForgetPassword
  })

  const codeForm = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: codeValidationSchema,
    onSubmit: handleVerifyResetCode
  })

  async function handleForgetPassword(values) {
    setLoading(true)
    
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        values
      )

      if (response.data.statusMsg === 'success') {
        toast.success('Reset code sent to your email!')
        setFormDisplay(false)
      }
    } catch (error) {
      console.error('Forget password error:', error)
      
      const errorMessage = error.response?.data?.message || 
        error.response?.data?.error || 
        'Failed to send reset code. Please try again.'
      
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyResetCode(values) {
    setLoading(true)
    
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        values
      )

      if (response.data.status === 'Success') {
        toast.success('Code verified successfully!')
        navigate('/UpdatePassword')
      }
    } catch (error) {
      console.error('Verify reset code error:', error)
      
      const errorMessage = error.response?.data?.message || 
        error.response?.data?.error || 
        'Invalid reset code. Please try again.'
      
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
          {formDisplay ? 'Reset your password' : 'Enter reset code'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {formDisplay ? (
            <>
              Enter your email address and we'll send you a reset code.
              <br />
              <Link 
                to="/Login" 
                className="font-medium text-[--main-color] hover:text-[--main-color-dark] transition-colors"
              >
                Back to sign in
              </Link>
            </>
          ) : (
            'Enter the reset code sent to your email address.'
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {formDisplay ? (
            // Email Form
            <form onSubmit={emailForm.handleSubmit} className="space-y-6">
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
                    onChange={emailForm.handleChange}
                    onBlur={emailForm.handleBlur}
                    value={emailForm.values.email}
                    className={`form-input ${
                      emailForm.touched.email && emailForm.errors.email 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : ''
                    }`}
                    placeholder="Enter your email address"
                  />
                  {emailForm.touched.email && emailForm.errors.email && (
                    <p className="form-error">{emailForm.errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || !(emailForm.isValid && emailForm.dirty)}
                  className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="loader w-4 h-4 mr-2"></div>
                      Sending reset code...
                    </>
                  ) : (
                    'Send reset code'
                  )}
                </button>
              </div>
            </form>
          ) : (
            // Reset Code Form
            <form onSubmit={codeForm.handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="resetCode" className="form-label">
                  Reset Code
                </label>
                <div className="mt-1">
                  <input
                    id="resetCode"
                    name="resetCode"
                    type="text"
                    autoComplete="off"
                    required
                    onChange={codeForm.handleChange}
                    onBlur={codeForm.handleBlur}
                    value={codeForm.values.resetCode}
                    className={`form-input ${
                      codeForm.touched.resetCode && codeForm.errors.resetCode 
                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                        : ''
                    }`}
                    placeholder="Enter the reset code"
                  />
                  {codeForm.touched.resetCode && codeForm.errors.resetCode && (
                    <p className="form-error">{codeForm.errors.resetCode}</p>
                  )}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setFormDisplay(true)}
                  className="flex-1 btn-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !(codeForm.isValid && codeForm.dirty)}
                  className="flex-1 btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="loader w-4 h-4 mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    'Verify code'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

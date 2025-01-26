import axios from 'axios'
import { useFormik, } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContextProvider'
export default function updatePassword() {
  let { setToken } = useContext(AuthContext)
  let [errorMessage, setError] = useState(null)
  const baseUrl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate()
  let validYup = Yup.object({
    email: Yup.string().required("email required").email("enter valid email"),
    newPassword: Yup.string().required("newPassword required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "newPassword invalid"),
  })
  let initialValues = {
    email: "",
    Password: "",
  }
  let LoginForm = useFormik({
    initialValues,
    onSubmit: updatePassword,
    validationSchema: validYup
  });
  async function updatePassword(data) {
    axios.put(`${baseUrl}/api/v1/auth/resetPassword`, data)
      .then((req) => {
        if (req.data.token) {
          navg('/')
        }
      })
      .catch((err) => {
        setError(err.response.data.message)
      });

  }
  return (
    <>
      {errorMessage ?
        <div className="p-4 mb-4 w-1/4 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {errorMessage}
        </div> : ""}

      <form onSubmit={LoginForm.handleSubmit} className="w-6/12 mt-5 mx-auto">

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            value={LoginForm.values.email}
            type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {LoginForm.touched.email && LoginForm.errors.email ? <p className="text-red-950">{LoginForm.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your newPassword</label>
          <input onChange={LoginForm.handleChange}
            onBlur={LoginForm.handleBlur}
            value={LoginForm.values.newPassword} type="password" id="newPassword" name="newPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {LoginForm.touched.newPassword && LoginForm.errors.newPassword ? <p className="text-red-950">{LoginForm.errors.newPassword}</p> : ""}
        </div>
      
        <button
          disabled={!(LoginForm.isValid && LoginForm.dirty)}
          type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-25">Update Password</button>
      </form>

    </>
  )
}

import axios from 'axios'
import { useFormik, } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
  let [errorMessage, setError] = useState(null)
  const baseUrl = 'https://ecommerce.routemisr.com'
  let navg = useNavigate()
  let validYup = Yup.object({
    name: Yup.string().required('name required').min(3, "min char 3").max(20, "max char 20"),
    email: Yup.string().required("email required").email("enter valid email"),
    password: Yup.string().required("password required").matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, "password invalid"),
    rePassword: Yup.string().required("repassword required").oneOf([Yup.ref('password')], "repassword is not matching the password"),
    phone: Yup.string().required("phone required").matches(/^(20)?01[1250][0-9]{8}$/, "enter valid phone")
  })
  let initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }
  let registerForm = useFormik({
    initialValues,
    onSubmit: registerApi,
    validationSchema: validYup
  });
  async function registerApi(data) {
    let req = await axios.post(`${baseUrl}/api/v1/auth/signup`, data)
      .then((req) => {
        if (req.data.message == 'success') {
          navg('/login')
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

      <form onSubmit={registerForm.handleSubmit} className="w-6/12 mt-5 mx-auto">
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.name} type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerForm.touched.name && registerForm.errors.name ? <p className="text-red-950">{registerForm.errors.name}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.email}
            type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerForm.touched.email && registerForm.errors.email ? <p className="text-red-950">{registerForm.errors.email}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.password} type="password" id="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerForm.touched.password && registerForm.errors.password ? <p className="text-red-950">{registerForm.errors.password}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your rePassword</label>
          <input onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.rePassword} type="Password" id="rePassword" name="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerForm.touched.rePassword && registerForm.errors.rePassword ? <p className="text-red-950">{registerForm.errors.rePassword}</p> : ""}
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
          <input onChange={registerForm.handleChange}
            onBlur={registerForm.handleBlur}
            value={registerForm.values.phone} type="tel" id="phone" name="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
          {registerForm.touched.phone && registerForm.errors.phone ? <p className="text-red-950">{registerForm.errors.phone}</p> : ""}
        </div>

        <button
          disabled={!(registerForm.isValid && registerForm.dirty)}
          type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-25">Submit</button>
      </form>

    </>
  )
}

import axios from 'axios'
import { useFormik, } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../context/AuthContextProvider'
export default function ForgetPassword() {
    let { setToken } = useContext(AuthContext)
    let [errorMessage, setError] = useState(null)
    let [formDisplay, setformDisplay] = useState(true)
    const baseUrl = 'https://ecommerce.routemisr.com'
    let navg = useNavigate()
    let validYup = Yup.object({
        email: Yup.string().required("email required").email("enter valid email"),
    })
    let valid2Yup = Yup.object({
        resetCode: Yup.string().required("resetCode is required"),
    })
    let ForgetForm = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: ForgetPasswordApi,
        validationSchema: validYup
    });
    let verifyResetCodeForm = useFormik({
        initialValues: {
            resetCode: "",
        },
        onSubmit: verifyResetCodeApi,
        validationSchema: valid2Yup
    });
    function verifyResetCodeApi(data) {
        axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data)
            .then((req) => {
                if(req.data.status == 'Success')
                navg('/updatePassword')

            })
            .catch((err) => {
                setError(err.response.data.message)
            });
    }
    function ForgetPasswordApi(data) {
        axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, data)
            .then((req) => {
                console.log(req.data)
                if (req.data.statusMsg == 'success') {
                    setformDisplay(false)
                }

            })
            .catch((err) => {
                setError(err.response.data.message)
            });

    }
    return (
        <>
            {formDisplay ? <div>
                {errorMessage ?
                    <div className="p-4 mb-4 w-1/4 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {errorMessage}
                    </div> : ""}

                <form onSubmit={ForgetForm.handleSubmit} className="w-6/12 mt-5 mx-auto">

                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input onChange={ForgetForm.handleChange}
                            onBlur={ForgetForm.handleBlur}
                            value={ForgetForm.values.email}
                            type="email" id="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                        {ForgetForm.touched.email && ForgetForm.errors.email ? <p className="text-red-950">{ForgetForm.errors.email}</p> : ""}
                    </div>
                    <button
                        disabled={!(ForgetForm.isValid && ForgetForm.dirty)}
                        type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-25">Send</button>
                </form>
            </div> : <div>
                {errorMessage ?
                    <div className="p-4 mb-4 w-1/4 mx-auto text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert"> {errorMessage}
                    </div> : ""}

                <form onSubmit={verifyResetCodeForm.handleSubmit} className="w-6/12 mt-5 mx-auto">

                    <div className="mb-5">
                        <label htmlFor="resetCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your resetCode</label>
                        <input onChange={verifyResetCodeForm.handleChange}
                            onBlur={verifyResetCodeForm.handleBlur}
                            value={verifyResetCodeForm.values.resetCode}
                            type="string" id="resetCode" name="resetCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-active focus:border-active block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-active dark:focus:border-active" />
                        {verifyResetCodeForm.touched.resetCode && verifyResetCodeForm.errors.resetCode ? <p className="text-red-950">{verifyResetCodeForm.errors.email}</p> : ""}
                    </div>
                    <button
                        disabled={!(verifyResetCodeForm.isValid && verifyResetCodeForm.dirty)}
                        type="submit" className="text-white bg-active hover:bg-active focus:ring-4 focus:outline-none focus:ring-active font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-active dark:hover:bg-active dark:focus:ring-active disabled:bg-active disabled:bg-opacity-25">verify code</button>
                </form>
            </div>
            }


        </>
    )
}

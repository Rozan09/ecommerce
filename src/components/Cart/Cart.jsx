import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContextProvider'
import toast, { Toaster } from 'react-hot-toast'
import { Link, Links } from 'react-router-dom'

export default function Cart() {
  let { getUserCart, deleteUserCart, setNumsCartItems, clearUserCart, updateCartItemCount } = useContext(CartContext)
  let [cartData, setCartData] = useState(null)
  let [loading, setLoading] = useState(true)
  let [loadingCount, setLoadingCount] = useState(false)
  useEffect(() => {
    getCartData();
  }, [])
  function getCartData() {
    setLoading(true)
    getUserCart()
      .then((req) => {
        setCartData(req.data.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }
  function removeItem(id) {
    deleteUserCart(id)
      .then((req) => {
        setNumsCartItems(req.data.numOfCartItems)
        setCartData(req.data.data)
        toast.success("product deleted")
      })
      .catch((err) => { })
  }
  function clearItems() {
    clearUserCart()
      .then((req) => {
        if (req.data.message == 'success') {
          setCartData(null)
          setNumsCartItems(null)
        }
      })
      .catch()
  }
  function updateCount(id, count) {
    document.getElementById(id).innerHTML =
      ' <i class="fa-solid fa-spinner fa-spin text-[--main-color]"></i>';
    updateCartItemCount(id, count)
      .then((req) => {
        setCartData(req.data.data)
        document.getElementById(id).innerHTML = count;
      })

  }
  if (loading) {
    return <div className="flex bg-slate-300 justify-center items-center h-screen">
      <span className="loader"></span>
    </div>
  }
  return <>
    <Toaster />
    {
      cartData?.products.length > 0 ? (<div className="w-10/12 mx-auto my-5">
        <div className="bg-gray-200 px-6">
          <h1 className="text-2xl">Shopping Cart</h1>
          <div className="flex justify-between">
            <h2 className="text-2xl text-[--main-color]">Total Cart Price :{getCartData.totalCartPrice}EGP</h2>
            <button onClick={clearItems} className="bg-red-600 text-white px-3 py-2 rounded">Clear Cart</button>
          </div>

          <div className="divide-y-2 divide-gray-300">
            {cartData.products.map((item) => {
              return <div key={item._id} className="flex items-center py-3">
                <div className="w-10/12 ml-4">
                  <div className="flex">
                    <div className="w-1/12">
                      <img src={item.product.imageCover} className='w-full' alt="" />
                    </div>
                    <div className="w-11/12 ml-4">
                      <h2>{item.product.title}</h2>
                      <h2 className='text-[--main-color]'>Price: {item.price}EGP</h2>
                      <button onClick={() => { removeItem(item.product._id) }} className='border border-red-500 px-5 py-2 rounded text-red-500 hover:text-white hover:bg-red-500'>
                        <i className='fa-solid fa-trash-can mr-2'></i>
                        Remove</button>
                    </div>
                  </div>
                </div>
                <div className="w-2/12">
                  <i onClick={() => { updateCount(item.product._id, item.count + 1) }} className='fa-solid cursor-pointer rounded border border-[--main-color] p-2 fa-plus'></i>
                  <span id={item.product._id} className='mx-2'>{item.count}</span>
                  <i onClick={() => { updateCount(item.product._id, item.count - 1) }} className='fa-solid cursor-pointer rounded border border-[--main-color] p-2 fa-minus'></i>
                </div>
              </div>
            })}
          </div>
          <button className='btn'>Pay <i className="fa-brands fa-cc-visa"></i></button>
        </div>
      </div>)
        : (
            /* Empty Cart State */
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
              <div className="text-center">
                <div className="text-gray-400 text-6xl mb-6">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
                </p>
                
                <div className="space-y-4">
                  <Link
                    to="/"
                    className="inline-flex items-center space-x-2 bg-[--main-color] text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-200 font-medium"
                  >
                    <i className="fas fa-shopping-bag"></i>
                    <span>Start Shopping</span>
                  </Link>
                  
                  <div className="text-sm text-gray-500">
                    <p>Need help? <Link to="/contact" className="text-[--main-color] hover:underline">Contact us</Link></p>
                  </div>
                </div>
              </div>
            </div>
          )}

  </>
}

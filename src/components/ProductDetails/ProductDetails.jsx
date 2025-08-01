import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { CartContext } from '../../context/CartContextProvider';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetails() {
    let [product, setProduct] = useState(null);
    let { id } = useParams();
    let { addUserCart ,setNumsCartItems } = useContext(CartContext);
    function getDetails(id) {
        axios.get(
            `https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((req) => {
                setProduct(req.data.data);
            });
    }
    useEffect(() => {
        getDetails(id);
    }, [id]);
    function changeImage(e) {
        let imgSrc = e.target.getAttribute("src")
        document.getElementById("myImg").setAttribute("src",imgSrc)
    }
    function addCart(id) {
        addUserCart(id)
          .then((req) => {
            console.log(req)
            setNumsCartItems(req.data.numOfCartItems)
            toast.success(req.data.message)
          })
          .catch(() => { 
            toast.error(err.response.data.message)
          })
      }
    return (<>
        <Toaster/>
        <div className="w-8/12 mx-auto my-5">
            <div className='flex justify-between items-center'>
                <div className="w-3/12">
                    <img src={product?.imageCover} id="myImg" className='w-full' alt="" />
                    <div className="flex mt-3">
                        {product?.images.map((image, i) => {
                            return (
                                <div key={i}>
                                    <img onClick={changeImage} src={image} className='w-full' alt="" />
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="w-8/12">
                    <h2>{product?.title}</h2>
                    <p className='text-gray-500 my-5'>{product?.description}</p>
                    <div className="flex justify-between">
                        <span>{product?.price}EGP</span>
                        <span>
                            <i className='fa-solid fa-star text-yellow-300'></i>
                            {product?.ratingsAverage}
                        </span>
                    </div>
                    <button onClick={()=>{addCart(id)}} className='btn mt-3'>
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
</>
    );
}

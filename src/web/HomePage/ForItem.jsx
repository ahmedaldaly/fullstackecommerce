import React from 'react'
import { RiCaravanLine } from "react-icons/ri";
import { PiCreditCardDuotone } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6"
const ForItem = () => {
  return (
    <div className='w-full h-auto flex flex-wrap justify-center'>
        <div className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200 flex justify-center items-center text-4xl'>
                <RiCaravanLine/>
            </div>
            <div className='mx-2 '>
                <h4>Free Shipping</h4>
                <p>Free Shipping for orders</p>
            </div>
        </div>

        <div className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200  flex justify-center items-center text-4xl'>
                <PiCreditCardDuotone/>
            </div>
            <div className='mx-2'>
                <h4>Free Shipping</h4>
                <p>Free Shipping for orders</p>
            </div>
        </div>

        <div className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200  flex justify-center items-center text-4xl'>
                <FaRegCircleCheck/>
            </div>
            <div className='mx-2'>
                <h4>Free Shipping</h4>
                <p>Free Shipping for orders</p>
            </div>
        </div>

        <div className='flex items-center mx-10 my-5'>
            <div className='w-20 h-20 rounded-full mx-5 border-2 border-gray-200  flex justify-center items-center text-4xl'>
                <PiCreditCardDuotone/>
            </div>
            <div className='mx-2'>
                <h4>Free Shipping</h4>
                <p>Free Shipping for orders</p>
            </div>
        </div>

    </div>
  )
}

export default ForItem
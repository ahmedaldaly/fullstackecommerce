import React, { useEffect, useState } from 'react';
import { useOrders } from "../../context/OrderContext";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
const ShopCard = () => {
 const [product, setProduct] = useState([])
 const [data, setData] = useState([])
  // جلب الطلبات من الكونتكست
  const { orders } = useOrders(); 

 useEffect(()=>{
  async function fetch() {
    await setProduct(orders.products);
    await setData(orders.favorites)
  }
  fetch()
},[orders])
console.log(product)
  console.log(data)
  return (
    <div className=' w-full h-auto mt-14 text-center'>
      <p className='font-bold text-2xl text-gray-600'>All Orders</p>
      <div className=' flex justify-center'>
        {
          product==undefined?<div>no product</div>:<div>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6 ">
  {product.map((item) => (
    <div
      key={item._id}
      className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    >
      {/* صورة المنتج */}
      <div className="relative w-full h-56">
        <img
          className="w-full h-full object-contain"
          src={item.image.url}
          alt={item.title}
        />
        {item.sale > 0 && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            خصم {item.sale}%
          </span>
        )}
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-5 text-center">
        <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>

        {/* السعر */}
        <div className="mt-3 flex items-center justify-center space-x-2">
          <p className="text-xl font-extrabold text-indigo-600">
            ${item.price}.00
          </p>
          {item.sale > 0 && (
            <p className="text-sm text-gray-400 line-through">
              ${(item.price + (item.price * item.sale) / 100).toFixed(2)}
            </p>
          )}
        </div>

        {/* التقييم */}
        <div className="mt-2 flex justify-center">
          <Box>
            <Rating name="simple-controlled" value={item.review} readOnly />
          </Box>
        </div>

        {/* زر الإضافة إلى السلة */}
        <button className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
       delete order
        </button>
      </div>
    </div>
  ))}
</div>

          </div>
        }
      </div>
    </div>
  )
}

export default ShopCard
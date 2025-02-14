import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BaseUrl from '../../../Api/BaseUrl';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import * as motion from 'motion/react-client';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { LuShoppingBag } from 'react-icons/lu';
import './shop.css';
import Cookie from 'js-cookie';
import ProductInfo from '../../../components/ProductInfo';

const Shop = () => {
  const [product, setProduct] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [orderedProducts, setOrderedProducts] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);
const [userfev, setUserfev] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${BaseUrl}/api/vi/product`);
        setProduct(data);

        const storedFavorites = Cookie.get('favorites');
        if (storedFavorites) {
          setFavorites(new Set(JSON.parse(storedFavorites)));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    }
    fetchData();
  }, [deletefev]);

  async function fev(id) {
    const token = Cookie.get('token');
    const userid = Cookie.get('id');
    try {
      await axios.post(`${BaseUrl}/api/vi/favorites/add`, { user: userid, product: id }, {
        headers: { "authorization": `Bearer ${token}` },
      });

      setFavorites(prevFavorites => {
        const newFavorites = new Set(prevFavorites);
        newFavorites.has(id) ? newFavorites.delete(id) : newFavorites.add(id);
        Cookie.set('favorites', JSON.stringify([...newFavorites]));
        return newFavorites;
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deletefev(id) {
    const token = Cookie.get('token');
    try {
      await axios.delete(`${BaseUrl}/api/vi/favorites/${id}`, {
        headers: { "authorization": `Bearer ${token}` },
      });

      setFavorites(prevFavorites => {
        const newFavorites = new Set(prevFavorites);
        newFavorites.delete(id);
        Cookie.set('favorites', JSON.stringify([...newFavorites]));
        return newFavorites;
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function addorder(id) {
    const token = Cookie.get('token');
    try {
      await axios.post(`${BaseUrl}/api/vi/order/add`, { product: id }, {
        headers: { "authorization": `Bearer ${token}` },
      });

      setOrderedProducts(prevOrders => new Set(prevOrders).add(id));
      alert('Product added successfully');
    } catch (err) {
      console.log(err);
    }
  }

  const closeProductInfo = () => {
    setSelectedProduct(null);
  };

  useEffect(()=>{
    async function fetch() {
      const token = Cookie.get('token');
      try{
        axios.get(`${BaseUrl}/api/vi/favorites`,{
        
            headers: { "authorization": `Bearer ${token}` },
          
        })
        .then((data)=> {
          console.log(data.data)
          setUserfev(data.data)
        })
      }catch(err){
        console.log(err)
      }
    }
    fetch()
  },[])

  return (
    <>
    <div className='w-full overflow-hidden px-10 md:px-20 lg:px-40 xl:px-60'>
      <h4 className='font-semibold my-8 text-3xl md:text-4xl'>Shop</h4>
      <div className='text-lg md:text-2xl font-medium'>
        <Link to='/' className='text-gray-600 hover:text-black transition duration-300'>Home</Link>
        <span className='mx-2'>/</span>
        <span className='text-black'>Shop</span>
      </div>

      <div className='w-full flex flex-wrap justify-center gap-6 my-8'>
        {product.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            key={item._id}
            className='bg-white hov shadow-md rounded-lg p-4 w-72 sm:w-80 group'
          >
            <div className='w-full h-72 overflow-hidden relative rounded-lg'>
              <img className='w-full h-full object-cover' src={item.image.url} alt={item.title} />

              <div className='absolute top-5 right-5 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition'>
                <button
                  onClick={() => favorites.has(item._id) ? deletefev(item._id) : fev(item._id)}
                  className={`p-3 rounded-full shadow-md transition ${
                    favorites.has(item._id) ? 'bg-orange-500 text-white' : 'bg-white hover:bg-orange-500 hover:text-white'
                  }`}
                >
                  {favorites.has(item._id) ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button 
               onClick={() => setSelectedProduct(item._id)}
                className='bg-white p-3 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition'>
                  <CiSearch size={20} />
                </button>
              </div>

              {!orderedProducts.has(item._id) && (
                <button 
                  onClick={() => addorder(item._id)}
                  className='absolute bottom-0 right-0 bg-white p-4 rounded-tl-xl shadow-md hover:bg-orange-500 hover:text-white transition'
                >
                  <LuShoppingBag size={22} />
                </button>
              )}
            </div>

            <div className='text-center mt-4'>
              <p className='text-gray-500'>{item.category}</p>
              <p className='font-bold text-lg my-1'>{item.title}</p>
              <p className='text-orange-500 text-lg font-semibold'>${item.price}.00</p>
              <Box>
                <Rating name='simple-controlled' value={item.review} readOnly />
              </Box>
            </div>
          </motion.div>
        ))}
      </div>
      {selectedProduct && <ProductInfo id={selectedProduct} closeProductInfo={closeProductInfo} />}
    </div>
    </>
  );
};

export default Shop;

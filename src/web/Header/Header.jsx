import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser, FaRegHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { MdOutlineShoppingCart ,MdMenuOpen} from "react-icons/md";
import Cookies from 'js-cookie'
import { BiMenuAltLeft } from "react-icons/bi";
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import BaseUrl from '../../../Api/BaseUrl'
import { IoIosLogOut } from "react-icons/io";
const Header = () => {
  const {register ,handleSubmit , formState:{errors}} =useForm()
  const [isScrolled, setIsScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onsupmit = async (data) => {
    try {
        const res = await axios.post(`${BaseUrl}/api/vi/auth/login`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const token = res.data.token;
        const email = res.data.user.email;
        Cookies.set("token",token,{expires:4})
        alert("Login successful!");
      setLogin(!login)
     
    } catch (err) {
      if (err.response) {
        console.error("Error Response:", err.response.data);
        alert("Login failed: " + (err.response.data.message || "Invalid credentials"));
      } else {
        console.error("Error Message:", err.message);
        alert("Login failed: " + err.message);
      }
    }
  };
const gettoken = Cookies.get('token')


  return (
    <div
      className={`fixed z-10 w-full h-24 lg:px-32 py-8 top-0 flex justify-evenly transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg bg-white' : 'shadow-none bg-transparent'
      }`}
    >
      <img
        src="https://miniture.b-cdn.net/wp-content/themes/miniture/assets/images/logo.svg"
        alt="logo"
        className="h-full max-md:hidden"
      />
      <div 
        onClick={() => setMenu(!menu)}
        className="menu mr-36 hover:text-orange-600 text-2xl hover:scale-125 duration-300 hidden max-md:block"
      >
        <BiMenuAltLeft />
      </div>
      <div className="flex max-md:hidden">
        <Link className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150">Home</Link>
        <Link className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150">Shop</Link>
        <Link className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150">About Us</Link>
        <Link className="mx-5 text-lg font-mono hover:text-orange-500 hover:scale-125 duration-150">Contact Us</Link>
      </div>
      <div className="flex text-xl max-md:hidden">

      {gettoken ? (
      <div>
        <button
          onClick={() => {
            Cookies.remove('token'); // إزالة التوكن من الكوكيز
            window.location.reload(); // إعادة تحميل الصفحة لتحديث الحالة
          }}
          className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
        >
          <IoIosLogOut/>
        </button>
      </div>
    ) : (
      <span
        onClick={() => setLogin(!login)} // فتح نافذة تسجيل الدخول
        className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
      >
        <FaRegUser />
      </span>
    )}
        
        <span className="mx-2 hover:text-orange-600 hover:scale-125 duration-150">
          <CiSearch />
        </span>
        <span className="mx-2 hover:text-orange-600 hover:scale-125 duration-150">
          <FaRegHeart />
        </span>
        <span className="mx-2 hover:text-orange-600 hover:scale-125 duration-150">
          <MdOutlineShoppingCart />
        </span>
      </div>
      <img
        src="https://miniture.b-cdn.net/wp-content/themes/miniture/assets/images/logo.svg"
        alt="logo"
        className="h-full max-md:w-24 hidden max-md:block"
      />
      <div className='max-md:flex text-xl hidden '>
        <span className="mx-2 hover:text-orange-600 hover:scale-125 duration-150">
          <CiSearch />
        </span>
        {gettoken ? (
      <div>
        <button
          onClick={() => {
            Cookies.remove('token'); // إزالة التوكن من الكوكيز
            window.location.reload(); // إعادة تحميل الصفحة لتحديث الحالة
          }}
          className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
        >
          <IoIosLogOut/>
        </button>
      </div>
    ) : (
      <span
        onClick={() => setLogin(!login)} // فتح نافذة تسجيل الدخول
        className="mx-2 hover:text-orange-600 hover:scale-125 duration-150"
      >
        <FaRegUser />
      </span>
    )}
      </div>

      {/* الشريط الجانبي */}
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }} // حالة البداية
            animate={{ opacity: 1, x: 0 }} // حالة العرض
            exit={{ opacity: 0, x: '-100%' }} // حالة الإخفاء
            transition={{ duration: 0.5 }} // مدة الأنيميشن
            className="fixed h-full w-48 shadow-md bg-white left-0 top-0"
          >
            <div className="p-4">
              <h2
                onClick={() => setMenu(false)} // غلق الشريط الجانبي
                className="text-xl cursor-pointer right-5 absolute"
              >
              <MdMenuOpen/>
              </h2>
            <Link className='block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300 mt-14'>Home</Link>
            <Link className='block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300'>Shop</Link>
            <Link className='block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300'>About Us</Link>
            <Link className='block w-full p-3 hover:text-orange-600 hover:bg-gray-100 hover:scale-125 duration-300'>Contact Us</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* تسجيل الدخول */}
      <AnimatePresence>
        {login && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }} // حالة البداية
            animate={{ opacity: 1, x: 0 }} // حالة العرض
            exit={{ opacity: 0, x: '100%' }} // حالة الإخفاء
            transition={{ duration: 0.5 }} // مدة الأنيميشن
            className=" h-full w-96 shadow-md bg-white  fixed  right-0 top-0"
          >
            <div className="p-4">
              <h1
                onClick={() => setLogin(!login)} // غلق الشريط الجانبي
                className="text-xl mt-5  flex justify-between  w-11/12 cursor-pointer left-5 absolute "
              >
              <MdMenuOpen/>
              <p>LogIn</p>
              </h1>
              <form  className='mt-20 ' onSubmit={handleSubmit(onsupmit)}>
        <div >
          <input
            type="email"
            placeholder='Enter Your Email'
            required
            className='w-11/12 mx-5 h-12 my-3 pl-3 border-2 border-gray-300'
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder='Enter Your password'
            required
            className='w-11/12 mx-5 h-12 my-3 pl-3 border-2 border-gray-300'
            {...register("passwoard", { required: "Password is required" })}
          />
          {errors.passwoard && (
            <p style={{ color: "red" }}>{errors.passwoard.message}</p>
          )}
        </div>

        <button
        className='w-11/12 h-12 bg-orange-400 text-white mx-5 hover:bg-black hover:text-white duration-300'
        type="submit" style={{ marginTop: "1rem" }}>Login</button>
      </form>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;

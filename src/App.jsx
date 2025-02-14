import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from'./web/Home';
import HomeDashbord from './dashbord/HomeDashbord'
import AllUser from './dashbord/user/AllUsers'
import AllProducts from './dashbord/Product/AllProducts'
import AddProducts from './dashbord/Product/AddProducts'
import AllCategory from './dashbord/Category/AllCategory';
import AddCategory from './dashbord/Category/AddCategory';
import AllOrder from './dashbord/order/AllOrder';
import HomePage from './web/HomePage/HomePage';
import Shop from './web/shop/Shop';
import ShopCard from './auth/ShopCard';
import SignUp from './auth/SignUp';
const App = () => {
  return (
    
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/card' element={<ShopCard/>}/>
        <Route path='/' element={<Home/>}>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<Shop/>}/>
        </Route> 

        <Route path='/dashbord' element ={<HomeDashbord/>}>
        <Route path='alluser' element ={<AllUser/>}/>
        <Route path='allproducts' element ={<AllProducts/>}/>
        <Route path='addproducts' element ={<AddProducts/>}/>
        <Route path='allCategory' element ={<AllCategory/>}/>
        <Route path='addcategory' element ={<AddCategory/>}/>
        <Route path='allorder' element ={<AllOrder/>}/>
        </Route>
      </Routes>
    
  )
}

export default App
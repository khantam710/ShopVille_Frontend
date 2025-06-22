import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
// import Success from './components/Success';
import Wishlist from './pages/Wishlist';
import { useSelector, useDispatch } from 'react-redux'
import { getwishByUser } from './redux/actions/wishAction';
import { getcart } from './redux/actions/cartAction';
import { useEffect } from 'react';
import Orders from './pages/Orders';
import CleverTap from 'clevertap-web-sdk';

function App() {

  // const userdata = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)

  useEffect(() => {
    dispatch(getwishByUser(user?._id))
    dispatch(getcart(user?._id))
  }, [user])

clevertap.privacy.push({optOut: false}) // Set the flag to true, if the user of the device opts out of sharing their data
clevertap.privacy.push({useIP: true})  // Set the flag to true, if the user agrees to share their IP data
clevertap.init('WWW-869-947Z', 'eu1')

// Trigger CleverTap onUserLogin when user logs in
  useEffect(() => {
    if (user && Object.keys(user).length > 0 && typeof window !== 'undefined' && window.clevertap) {
      window.clevertap.onUserLogin && window.clevertap.onUserLogin.push({
        "Site": {
          "Name": user.name || "",
          "Identity": user._id || "",
          "Email": user.email || "",
          "Phone": user.phone || "", // Use full number with country code if available
        }
      });

      // Optionally log login event
      window.clevertap.event && window.clevertap.event.push("User Logged In");
      console.log("CleverTap onUserLogin triggered");
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/product/:prodID' element={<SingleProduct/>} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          {/* <Route path='/products' element={user !== null && Object.keys(user).length !== 0 ? <ProductList /> : <Navigate to='/' />} />
          <Route path='/products/:category' element={user !== null && Object.keys(user).length !== 0 ? <ProductList /> : <Navigate to='/' />} />
          <Route path='/product/:prodID' element={user !== null && Object.keys(user).length !== 0 ? <SingleProduct /> : <Navigate to='/' />} /> */}
          <Route path='/cart' element={user !== null && Object.keys(user).length !== 0 ? <Cart /> : <Navigate to='/login' />} />
          <Route path='/wishlist' element={user !== null && Object.keys(user).length !== 0 ? < Wishlist /> : <Navigate to='/login' />} />
          <Route path='/orders' element={user !== null && Object.keys(user).length !== 0 ? <Orders /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

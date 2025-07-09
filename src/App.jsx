import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home';
import ProductList from './pages/ProductList';
import SingleProduct from './pages/SingleProduct';
import PaymentSuccess from './pages/PaymentSuccess';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import { useSelector, useDispatch } from 'react-redux'
import { getwishByUser } from './redux/actions/wishAction';
import { getcart } from './redux/actions/cartAction';
import { useEffect } from 'react';
import Orders from './pages/Orders';
import CleverTap from 'clevertap-web-sdk';

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.currentUser)

  //  Fetch cart and wishlist
  useEffect(() => {
    dispatch(getwishByUser(user?._id))
    dispatch(getcart(user?._id))
  }, [user])

  //  CleverTap initialization
  clevertap.privacy.push({ optOut: false });
  clevertap.privacy.push({ useIP: true });
  clevertap.init('WWW-869-947Z', 'eu1');

// Set CleverTap notification callback
// useEffect(() => {
//   if (typeof window !== 'undefined' && window.clevertap) {
//     // Avoid overwriting if already set
//     if (!clevertap.notificationCallback) {
//       clevertap.notificationCallback = function(msg) {
//         clevertap.raiseNotificationViewed();
//         clevertap.raiseNotificationClicked();
//         console.log("Notification received:", JSON.stringify(msg));
//       };
//       console.log("✅ CleverTap notificationCallback registered");
//     }
//   }
// }, []);


  //  Register Service Worker (once on mount)
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          return registration.unregister();
        })
        .then(success => {
          if (success) {
            console.log('Previous service worker unregistered successfully.');
          }
          return navigator.serviceWorker.register('/clevertap_sw.js', { scope: '/' });
        })
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  //  On User Login, push to CleverTap + show push prompt
  useEffect(() => {
    if (user && Object.keys(user).length > 0 && typeof window !== 'undefined' && window.clevertap) {
      window.clevertap.onUserLogin({
        "Site": {
          "Name": user.name || "",
          "Identity": user._id || "",
          "Email": user.email || "",
          "Phone": user.phone || "",
        }
      });

    //   window.clevertap.event && window.clevertap.event.push("User Logged In", {
    //   page: window.location.pathname,
    //   title: document.title,
    //   url: window.location.href
    // });
    // console.log("CleverTap onUserLogin + User Logged In event triggered");

      //  Show push permission prompt
      clevertap.notifications.push({
        titleText: "Would you like to receive Push Notifications?",
        bodyText: "We promise to only send you relevant content and give you updates on your transactions",
        okButtonText: "Sign me up!",
        rejectButtonText: "No thanks",
        okButtonColor: "#F28046",
        askAgainTimeInSeconds: 5,
        serviceWorkerPath: "/clevertap_sw.js",
        serviceWorkerScope: "/",
        // notificationIcon: "https://yourdomain.com/icon.png" // optional
      });

      console.log("CleverTap: Push prompt displayed");
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />   {/* 👈 ADD THIS LINE */}
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path='/product/:prodID' element={<SingleProduct />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path='/cart' element={user ? <Cart /> : <Navigate to='/login' />} />
          <Route path='/wishlist' element={user ? <Wishlist /> : <Navigate to='/login' />} />
          <Route path='/orders' element={user ? <Orders /> : <Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

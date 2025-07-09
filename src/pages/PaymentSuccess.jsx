// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PaymentSuccess = () => {
//   const query = new URLSearchParams(useLocation().search);
//   const reference = query.get('reference');

//   const { cartItems, cartTotal } = useSelector(state => state.cart);
//   const user = useSelector(state => state.user.currentUser);

//   useEffect(() => {
//     if (window.clevertap && cartItems.length > 0) {
//       const items = cartItems.map(item => ({
//         id: item._id,
//         title: item.title || item.name,
//         price: item.price,
//         quantity: item.quantity || 1
//       }));

//       window.clevertap.event.push("Charged", {
//         value: cartTotal,
//         payment_reference: reference,
//         items,
//         user_id: user?._id,
//         name: user?.name,
//         email: user?.email
//       });

//       console.log("✅ CleverTap Charged event fired:", {
//         value: cartTotal,
//         payment_reference: reference,
//         items
//       });
//     }
//   }, []);

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>🎉 Payment Successful!</h2>
//       <p>Payment Reference: {reference}</p>
//     </div>
//   );
// };

// export default PaymentSuccess;

// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const PaymentSuccess = () => {
//   const query = new URLSearchParams(useLocation().search);
//   const reference = query.get('reference');

//   const cartItems = JSON.parse(localStorage.getItem('lastCart') || '[]');
//   const cartTotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
//   const user = JSON.parse(localStorage.getItem('currentUser'));

//   useEffect(() => {
//     if (!window.clevertap) {
//       console.warn("CleverTap SDK not loaded");
//       return;
//     }

//     if (cartItems.length === 0) {
//       console.warn("Cart is empty, skipping Charged event");
//       return;
//     }

//     const items = cartItems.map(item => ({
//       id: item._id,
//       title: item.title || item.name,
//       price: item.price,
//       quantity: item.quantity || 1
//     }));

//     window.clevertap.event.push("Charged", {
//       value: cartTotal,
//       payment_reference: reference,
//       items,
//       user_id: user?._id,
//       name: user?.name,
//       email: user?.email
//     });

//     console.log("CleverTap Charged event fired:", {
//       value: cartTotal,
//       payment_reference: reference,
//       items
//     });
//   }, []);

//   return (
//     <div style={{ padding: 40 }}>
//       <h2>🎉 Payment Successful!</h2>
//       <p>Payment Reference: {reference}</p>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get('reference');

  const cartItems = JSON.parse(localStorage.getItem('lastCart') || '[]');
  const cartTotal = parseFloat(localStorage.getItem('lastCartTotal') || '0');
  const user = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    if (!window.clevertap) {
      console.warn("CleverTap SDK not available");
      return;
    }

    if (!cartItems.length) {
      console.warn("⚠️ Cart is empty, skipping Charged event");
      return;
    }

    const items = cartItems.map(item => ({
      id: item._id,
      title: item.title,
      price: item.price,
      quantity: item.quantity || 1
    }));

    window.clevertap.event.push("Charged", {
      value: cartTotal,
      payment_reference: reference,
      items,
      user_id: user?._id,
      name: user?.name,
      email: user?.email
    });

    console.log("✅ CleverTap Charged event sent", {
      value: cartTotal,
      reference,
      items
    });

    // Optional: Clean up cart backup
    localStorage.removeItem('lastCart');
    localStorage.removeItem('lastCartTotal');

  }, []);

  return (
  <>
    <Navbar />

    <div style={{
      minHeight: '80vh',
      backgroundColor: '#f3faf7',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        padding: '40px 30px',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '60px',
          color: '#2ecc71',
          marginBottom: '20px'
        }}>
          ✅
        </div>
        <h2 style={{ fontSize: '28px', marginBottom: '10px', color: '#333' }}>
          Payment Successful!
        </h2>
        <p style={{ fontSize: '16px', color: '#666', marginBottom: '20px' }}>
          Thank you for your order. Your payment has been processed successfully.
        </p>
        <div style={{
          backgroundColor: '#f9f9f9',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '15px',
          wordBreak: 'break-word'
        }}>
          <strong>Payment Reference:</strong><br />
          <span style={{ color: '#444' }}>{reference}</span>
        </div>
      </div>
    </div>

    <Footer />
  </>
);


export default PaymentSuccess;


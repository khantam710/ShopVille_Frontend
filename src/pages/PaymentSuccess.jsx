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
    <div style={{ padding: 40 }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Payment Reference: {reference}</p>
    </div>
  );
};

export default PaymentSuccess;


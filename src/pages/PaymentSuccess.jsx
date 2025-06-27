// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const PaymentSuccess = () => {
//   const query = new URLSearchParams(useLocation().search);
//   const reference = query.get('reference');

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
import { useSelector } from 'react-redux';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get('reference');

  const { cartItems, cartTotal } = useSelector(state => state.cart);
  const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    if (window.clevertap && cartItems.length > 0) {
      const items = cartItems.map(item => ({
        id: item._id,
        title: item.title || item.name,
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

      console.log("✅ CleverTap Charged event fired:", {
        value: cartTotal,
        payment_reference: reference,
        items
      });
    }
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Payment Reference: {reference}</p>
    </div>
  );
};

export default PaymentSuccess;


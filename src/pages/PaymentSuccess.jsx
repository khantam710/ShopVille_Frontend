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
   <Navbar />
    <div style={{ padding: 40 }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Payment Reference: {reference}</p>
    </div>
  <Footer/>
  );
};

export default PaymentSuccess;

import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get('reference');

  return (
    <div style={{ padding: 40 }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Payment Reference: {reference}</p>
    </div>
  );
};

export default PaymentSuccess;

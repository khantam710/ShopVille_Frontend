import { useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get('payment_id');
  const orderId = query.get('order_id');

  return (
    <div style={{ padding: 40 }}>
      <h2>🎉 Payment Successful!</h2>
      <p>Payment ID: {paymentId}</p>
      <p>Order ID: {orderId}</p>
    </div>
  );
};

export default PaymentSuccess;

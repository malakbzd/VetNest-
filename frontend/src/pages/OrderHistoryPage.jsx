import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../api';
import './OrderHistoryPage.css';

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading orders...</div>;

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <p>📦 You haven't placed any orders yet.</p>
        <Link to="/shop">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <div className="order-header">
            <span>Order #{order._id.slice(-6)}</span>
            <span className={`status ${order.orderStatus}`}>{order.orderStatus}</span>
          </div>
          <div className="order-details">
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total:</strong> ${order.totalAmount}</p>
            <p><strong>Payment:</strong> {order.paymentStatus}</p>
            <p><strong>Delivery:</strong> {order.deliveryMethod === "home_delivery" ? "Home Delivery" : "Pickup"}</p>
          </div>
          <div className="order-items">
            {order.items.map(item => (
              <div key={item.product._id} className="order-item">
                <span>{item.product.name}</span>
                <span>{item.quantity} x ${item.price} = ${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
import React, { useState } from 'react';
import { createOrder } from '../api';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [address, setAddress] = useState({ street: '', city: '', zip: '' });
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = { deliveryMethod, paymentMethod };
      if (deliveryMethod === 'home_delivery') orderData.deliveryAddress = address;
      await createOrder(orderData);
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Delivery Method</label>
          <select value={deliveryMethod} onChange={e => setDeliveryMethod(e.target.value)}>
            <option value="pickup">Pickup from clinic</option>
            <option value="home_delivery">Home Delivery</option>
          </select>
        </div>

        {deliveryMethod === 'home_delivery' && (
          <div className="address-group">
            <input type="text" placeholder="Street" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} required />
            <input type="text" placeholder="City" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} required />
            <input type="text" placeholder="ZIP code" value={address.zip} onChange={e => setAddress({...address, zip: e.target.value})} required />
          </div>
        )}

        <div className="form-group">
          <label>Payment Method</label>
          <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
            <option value="cash_on_delivery">Cash on Delivery</option>
            <option value="card">Credit Card (demo)</option>
          </select>
          {paymentMethod === 'card' && <p className="note">(Demo: no real payment processing)</p>}
        </div>

        <button type="submit" disabled={loading} className="place-order-btn">
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
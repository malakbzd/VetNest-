import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../api';
import './CartPage.css';

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCart();
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCart(); }, []);

  const handleQuantityChange = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(productId, newQty);
      fetchCart();
    } catch (err) { alert('Failed to update quantity'); }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      fetchCart();
    } catch (err) { alert('Failed to remove item'); }
  };

  const handleCheckout = () => navigate('/checkout');
  const handleClearCart = async () => {
    if (window.confirm('Clear entire cart?')) {
      await clearCart();
      fetchCart();
    }
  };

  if (loading) return <div className="loading">Loading your cart...</div>;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="empty-cart">
        <p>🐾 Your cart is empty. Time to spoil your pet!</p>
        <Link to="/shop">Continue Shopping</Link>
      </div>
    );
  }

  const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.items.map(item => (
          <div key={item.product._id} className="cart-item">
            <img src={item.product.image || 'https://via.placeholder.com/120'} alt={item.product.name} />
            <div className="cart-item-details">
              <h3>{item.product.name}</h3>
              <p>${item.product.price}</p>
              <div className="cart-quantity">
                <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => handleRemove(item.product._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
        <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
      </div>
    </div>
  );
}
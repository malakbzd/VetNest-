import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, removeFavorite, addToCart } from '../api';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFavorites(); }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFavorite(productId);
      fetchFavorites();
    } catch (err) { alert('Failed to remove'); }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId, 1);
      alert('Added to cart!');
    } catch (err) { alert('Failed to add to cart'); }
  };

  if (loading) return <div className="loading">Loading favorites...</div>;

  if (favorites.length === 0) {
    return (
      <div className="empty-favorites">
        <p>❤️ No favorites yet. Start adding some products!</p>
        <Link to="/shop">Browse Shop</Link>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h1>My Favorites</h1>
      <div className="favorites-grid">
        {favorites.map(fav => (
          <div key={fav._id} className="favorite-card">
            <img src={fav.product.image || 'https://via.placeholder.com/200'} alt={fav.product.name} />
            <h3>{fav.product.name}</h3>
            <p>${fav.product.price}</p>
            <div className="favorite-actions">
              <button onClick={() => handleAddToCart(fav.product._id)}>Add to Cart</button>
              <button onClick={() => handleRemove(fav.product._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
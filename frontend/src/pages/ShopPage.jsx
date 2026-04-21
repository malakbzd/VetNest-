import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCart, getFavorites } from "../api";
import ProductCard from "./ProductCard";
import "./Shop.css";
import "./ProductCard.css";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const fetchData = async () => {
      try {
        const productsRes = await getProducts();
        setProducts(productsRes.data);

        if (token) {
          const [cartRes, favRes] = await Promise.all([getCart(), getFavorites()]);
          const itemCount = cartRes.data.items.reduce((sum, i) => sum + i.quantity, 0);
          setCartCount(itemCount);
          setFavCount(favRes.data.length);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const refreshCartCount = async () => {
    if (!isLoggedIn) return;
    try {
      const cartRes = await getCart();
      const count = cartRes.data.items.reduce((sum, i) => sum + i.quantity, 0);
      setCartCount(count);
    } catch (err) {
      console.error("Failed to refresh cart", err);
    }
  };

  if (loading) return <div className="shop-loading">Loading...</div>;
  if (error) return <div className="shop-error">{error}</div>;

  return (
    <div className="shop-container">
      {/* Shop header with Cart, Favorites, Orders links – only visible on shop page */}
      <div className="shop-header">
        <h1 className="shop-title">Pet Shop</h1>
        {isLoggedIn && (
          <div className="shop-links">
            <Link to="/cart" className="shop-link">
              🛒 Cart {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </Link>
            <Link to="/favorites" className="shop-link">
              ❤️ Favorites {favCount > 0 && <span className="badge">{favCount}</span>}
            </Link>
            <Link to="/orders" className="shop-link">
              📦 Orders
            </Link>
          </div>
        )}
      </div>

      {/* Product grid */}
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="shop-grid">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCartSuccess={refreshCartCount}
            />
          ))}
        </div>
      )}
    </div>
  );
}
import React, { useState } from "react";
import "./ProductCard.css";
import { addToCart, addFavorite } from "../api";
import {
  FaShoppingCart,
  FaHeart
} from "react-icons/fa";

function ProductCard({ product, onAddToCartSuccess }) {

  const [loading, setLoading] = useState(false);

  // ===== ADD TO CART =====
  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await addToCart(product._id, 1);

      if (onAddToCartSuccess) onAddToCartSuccess();

      alert("Added to cart");

    } catch (err) {
      console.error("Cart error:", err);
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  // ===== ADD TO FAVORITES =====
  const handleAddToFavorites = async () => {
    try {
      setLoading(true);

      await addFavorite(product._id);

      alert("Added to favorites");

    } catch (err) {
      console.error("Favorite error:", err);
      alert("Failed to add to favorites");
    } finally {
      setLoading(false);
    }
  };

  const getImage = (img) => {
    if (!img || typeof img !== "string") return "/placeholder.png";
    if (img.startsWith("http")) return img;
    if (img.includes("uploads/")) return `http://localhost:5000/${img}`;
    return `http://localhost:5000/uploads/${img}`;
  };

  return (
    <div className="product-card">

      <img
        className="product-image"
        src={getImage(product?.image)}
        alt={product?.name}
      />

      <div className="product-content">

        <h3>{product?.name}</h3>
        <p>{product?.description}</p>
        <p>${product?.price}</p>

        <div className="product-actions">

          <button
            className="product-btn cart"
            onClick={handleAddToCart}
            disabled={loading}
          >
            <FaShoppingCart /> Add to Cart
          </button>

          <button
            className="product-btn fav"
            onClick={handleAddToFavorites}
            disabled={loading}
          >
            <FaHeart /> Favorite
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;
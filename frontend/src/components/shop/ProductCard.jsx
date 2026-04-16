import React, { useState } from "react";
import { addToCart, addFavorite, removeFavorite } from "../../api";

export default function ProductCard({ 
  product, 
  isFavorite = false, 
  onFavoriteToggle, 
  onAddToCartSuccess 
}) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [adding, setAdding] = useState(false);

  const imageUrl = product?.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000/uploads/${product.image.replace("uploads/", "")}`
    : "https://via.placeholder.com/300";

  const handleAddToCart = async () => {
    if (adding) return;
    setAdding(true);
    try {
      await addToCart(product._id, 1);
      alert("✅ Added to cart");
      if (onAddToCartSuccess) onAddToCartSuccess();
    } catch (err) {
      console.error("Add to cart error:", err);
      const msg = err.response?.data?.error || err.message;
      alert(`❌ Failed to add to cart: ${msg}`);
    } finally {
      setAdding(false);
    }
  };

  const handleToggleFavorite = async () => {
    try {
      if (favorite) {
        await removeFavorite(product._id);
        setFavorite(false);
      } else {
        await addFavorite(product._id);
        setFavorite(true);
      }
      if (onFavoriteToggle) onFavoriteToggle(product._id, !favorite);
    } catch (err) {
      console.error("Favorite error:", err);
      const msg = err.response?.data?.error || err.message;
      alert(`❌ Failed to update favorites: ${msg}`);
    }
  };

  return (
    <div style={styles.card}>
      <img
        src={imageUrl}
        alt={product?.name || "Product"}
        style={styles.image}
        onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
      />
      <div style={styles.content}>
        <h3 style={styles.title}>{product?.name || "No name"}</h3>
        <p style={styles.description}>{product?.description || "No description"}</p>
        <p style={styles.price}>${product?.price?.toFixed(2) || "0.00"}</p>
        <div style={styles.buttonGroup}>
          <button onClick={handleAddToCart} style={styles.cartBtn} disabled={adding}>
            {adding ? "Adding..." : "🛒 Add to Cart"}
          </button>
          <button onClick={handleToggleFavorite} style={styles.favBtn}>
            {favorite ? "❤️ Remove" : "🤍 Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  content: {
    padding: "1rem",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    fontWeight: "600",
    color: "#1a2a4f",
  },
  description: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
    flex: 1,
  },
  price: {
    color: "#e67e22",
    fontWeight: "bold",
    fontSize: "1.2rem",
    margin: "0.5rem 0",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  cartBtn: {
    flex: 2,
    padding: "0.5rem",
    background: "linear-gradient(135deg, #1a2a4f, #0f1a33)",
    color: "white",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "transform 0.1s",
  },
  favBtn: {
    flex: 1,
    padding: "0.5rem",
    background: "#f5a3c7",
    color: "#1a2a4f",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "transform 0.1s",
  },
};
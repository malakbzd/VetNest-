import React from "react";

function ProductCard({ product }) {
  return (
    <div style={styles.card}>
      <img src={product.image || "https://via.placeholder.com/300"} alt={product.name} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>${product.price}</p>
        <button style={styles.button}>Add to Cart</button>
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
    transition: "transform 0.3s",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  content: {
    padding: "1rem",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  description: {
    color: "#666",
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  price: {
    color: "#e67e22",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    background: "linear-gradient(135deg, #3498db, #2ecc71)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
};

export default ProductCard;
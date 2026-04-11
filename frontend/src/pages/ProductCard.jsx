import React from "react";

function ProductCard({ product }) {

  const getImage = (img) => {
    if (!img) return "https://via.placeholder.com/300";

    // إذا الصورة URL مباشرة (preview من PC)
    if (img.startsWith("blob:") || img.startsWith("http")) {
      return img;
    }

    // إذا جاية من backend
    return `http://localhost:5000/uploads/${img}`;
  };

  return (
    <div style={styles.card}>
      <img
        src={getImage(product.image)}
        alt={product.name}
        style={styles.image}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300";
        }}
      />

      <div style={styles.content}>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <p style={styles.price}>${product.price}</p>

        <button style={styles.button}>
          Add to Cart
        </button>
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
  },
  description: {
    color: "#666",
    fontSize: "0.9rem",
  },
  price: {
    color: "#e67e22",
    fontWeight: "bold",
    marginTop: "0.5rem",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
  },
};

export default ProductCard;
import React from "react";

function ProductCard({ product }) {

  const getImage = (img) => {
    // ❌ إذا ماكانش img
    if (!img || typeof img !== "string") {
      return "https://via.placeholder.com/300";
    }

    // ✅ preview (upload من الجهاز)
    if (img.startsWith("blob:")) {
      return img;
    }

    // ✅ إذا URL جاهز
    if (img.startsWith("http")) {
      return img;
    }

    // ⚠️ إذا فيها uploads/ من قبل
    if (img.includes("uploads/")) {
      return `http://localhost:5000/${img}`;
    }

    // ✅ الحالة العادية (اسم الصورة فقط)
    return `http://localhost:5000/uploads/${img}`;
  };

  return (
    <div style={styles.card}>

      {/* 🖼️ IMAGE */}
      <img
        src={getImage(product?.image)}
        alt={product?.name || "product"}
        style={styles.image}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300";
        }}
      />

      {/* 📦 CONTENT */}
      <div style={styles.content}>
        <h3 style={styles.title}>
          {product?.name || "No name"}
        </h3>

        <p style={styles.description}>
          {product?.description || "No description"}
        </p>

        <p style={styles.price}>
          ${product?.price || 0}
        </p>

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
    marginBottom: "0.5rem",
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
    padding: "0.6rem",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    cursor: "pointer",
  },
};

export default ProductCard;
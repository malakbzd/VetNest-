import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {

  const getImage = (img) => {
    if (!img || typeof img !== "string") {
      return "https://via.placeholder.com/300";
    }

    if (img.startsWith("blob:")) return img;

    if (img.startsWith("http")) return img;

    if (img.includes("uploads/")) {
      return `http://localhost:5000/${img}`;
    }

    return `http://localhost:5000/uploads/${img}`;
  };

  return (
    <div className="product-card">

      <img
        className="product-image"
        src={getImage(product?.image)}
        alt={product?.name || "product"}
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300";
        }}
      />

      <div className="product-content">

        <h3 className="product-title">
          {product?.name || "No name"}
        </h3>

        <p className="product-description">
          {product?.description || "No description"}
        </p>

        <p className="product-price">
          ${product?.price || 0}
        </p>

        <button className="product-btn">
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;
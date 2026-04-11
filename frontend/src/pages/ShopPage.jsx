import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import ProductCard from "../components/shop/ProductCard";
import "./Shop.css"; // استيراد ملف CSS

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="shop-loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">
          <i className="fas fa-spinner fa-pulse"></i>
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      <h1 className="shop-title">
        <i className="fas fa-paw"></i>
        Pet Shop
      </h1>
      
      {products.length === 0 ? (
        <div className="shop-no-data">
          <i className="fas fa-box-open"></i>
          No products available. Check back later!
        </div>
      ) : (
        <div className="shop-grid">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
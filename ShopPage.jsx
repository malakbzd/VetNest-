import React, { useEffect, useState } from "react";
import { getProducts } from "../api";
import ProductCard from "../components/shop/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);
  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2>Shop</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
        {products.map(p => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}
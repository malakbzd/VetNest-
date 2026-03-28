import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/shop/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <h2>Shop</h2>
      {products.map(p => <ProductCard key={p._id} product={p} />)}
    </div>
  );
}
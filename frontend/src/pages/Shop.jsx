import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h2>Shop</h2>

      {products.length === 0 ? (
        <p>No products</p>
      ) : (
        products.map((p) => (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <p>{p.price} DA</p>
            <p>{p.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
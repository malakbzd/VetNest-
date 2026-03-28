export default function ProductCard({ product }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{product.name}</h3>
      <p>{product.price} DA</p>
      <p>{product.description}</p>
    </div>
  );
}
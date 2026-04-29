import { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaShoppingCart, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import "./AdminShop.css";

export default function AdminShop() {
  const formRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Error loading");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Name required");
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    if (form.image) data.append("image", form.image);

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/products/${editingId}`,
          data
        );
        toast.success("Product updated");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          data
        );
        toast.success("Product added");
      }

      fetchProducts();

      // reset form
      setForm({
        name: "",
        description: "",
        price: "",
        image: null,
      });

      setPreview(null);
      setEditingId(null);

    } catch (err) {
      console.log(err);
      toast.error("Operation failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // ================= EDIT =================
  const handleEdit = (p) => {
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      image: null,
    });

    setEditingId(p._id);

    setPreview(
      p.image
        ? `http://localhost:5000/uploads/${p.image}`
        : null
    );

    // 🔥 smooth scroll + focus
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const input = formRef.current?.querySelector("input");
      input?.focus();
    });
  };

  // ================= SEARCH =================
  const filtered = products.filter((p) =>
    (p?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-shop-container">

      {/* TITLE */}
      <h2 className="admin-title">
        <FaShoppingCart className="title-icon" />
        Shop
      </h2>

      {/* SEARCH */}
      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FORM */}
      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">

        <input
          className="admin-input"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="admin-input"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        {/* IMAGE */}
      <div className="file-upload">
  <input
    id="fileInput"
    type="file"
    accept="image/*"
    hidden
    onChange={(e) => {
      const file = e.target.files[0];
      setForm({ ...form, image: file });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    }}
  />

  <label htmlFor="fileInput" className="file-btn">
    📁 Upload Product Image
  </label>
</div>

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            className="preview-img"
            alt="preview"
          />
        )}

        <input
          className="admin-input full"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button className="admin-btn">
          {editingId ? "Update Product" : "Add Product"}
        </button>

      </form>

      {/* PRODUCTS */}
      <div className="shop-grid">

        {filtered.length === 0 ? (
          <p className="no-data">No products found</p>
        ) : (
          filtered.map((p) => (
            <div key={p._id} className="product-card">

              <img
                src={
                  p.image
                    ? `http://localhost:5000/uploads/${p.image}`
                    : "/placeholder.png"
                }
                alt={p.name}
              />

              <div className="product-content">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="price">${p.price}</span>

                <div className="product-actions">

                  <button
                    type="button"
                    className="action-btn edit"
                    onClick={() => handleEdit(p)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    className="action-btn delete"
                    onClick={() => handleDelete(p._id)}
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}
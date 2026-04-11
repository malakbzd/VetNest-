import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaShoppingCart, FaTrash, FaEdit } from "react-icons/fa";
import "./AdminShop.css";

export default function AdminShop() {
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

  // ===== FETCH =====
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Error loading products ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===== SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name required ❌");
      return;
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
        toast.success("Updated ✅");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          data
        );
        toast.success("Added ✅");
      }

      fetchProducts();

      setForm({
        name: "",
        description: "",
        price: "",
        image: null,
      });

      setPreview(null);
      setEditingId(null);

    } catch (err) {
      console.error(err);
      toast.error("Error ❌");
    }
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      toast.success("Deleted 🗑️");
      fetchProducts();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // ===== EDIT =====
  const handleEdit = (p) => {
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      image: null,
    });

    setEditingId(p._id);
    setPreview(`http://localhost:5000/uploads/${p.image}`);
  };

  // ===== SEARCH SAFE 🔥 =====
  const filtered = products.filter((p) =>
    (p?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-shop-container">

      <h2 className="admin-title">
        <FaShoppingCart className="title-icon" />
        Shop
      </h2>

      {/* SEARCH */}
      <input
        className="admin-input"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="admin-form">

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
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        {/* IMAGE */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            setForm({ ...form, image: file });

            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
        />

        {preview && (
          <img src={preview} className="preview-img" alt="preview" />
        )}

        <input
          className="admin-input full"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <div className="form-actions">
          <button className="admin-btn">
            {editingId ? "Update" : "Add Product"}
          </button>
        </div>

      </form>

      {/* PRODUCTS */}
      <div className="shop-grid">
        {filtered.length === 0 ? (
          <p className="no-data">No products found</p>
        ) : (
          filtered.map((p) => (
            <div key={p._id} className="product-card">

              <img
                src={`http://localhost:5000/uploads/${p.image}`}
                alt={p.name}
              />

              <div className="product-content">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="price">${p.price}</span>

                <div className="product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(p)}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
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
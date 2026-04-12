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

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Error loading ❌");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Name required ❌");
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

      // refresh
      fetchProducts();

      // reset
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
      toast.error("Error ❌");
    }
  };

  // ================= DELETE =================
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

  // ================= EDIT =================
  const handleEdit = (p) => {
    setForm({
      name: p.name || "",
      description: p.description || "",
      price: p.price || "",
      image: null,
    });

    setEditingId(p._id);

    // 🔥 preview الصورة القديمة
    setPreview(
      p.image
        ? `http://localhost:5000/uploads/${p.image}`
        : null
    );
  };

  // ================= SEARCH =================
  const filtered = products.filter((p) =>
    (p?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-shop-container">

      <h2 className="admin-title">
        <FaShoppingCart /> Shop
      </h2>

      {/* SEARCH */}
      <input
        className="admin-input"
        placeholder="Search..."
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
          type="number"
          placeholder="Price"
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
          {editingId ? "Update" : "Add Product"}
        </button>

      </form>

      {/* PRODUCTS */}
      <div className="shop-grid">
        {filtered.length === 0 ? (
          <p className="no-data">No products</p>
        ) : (
          filtered.map((p) => (
            <div key={p._id} className="product-card">

              {/* 🔥 الصورة (المشكلة كانت هنا) */}
              <img
                src={
                  p.image
                    ? `http://localhost:5000/uploads/${p.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={p.name}
              />

              <div className="product-content">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <span className="price">${p.price}</span>

                <div className="product-actions">
                  <button onClick={() => handleEdit(p)}>
                    <FaEdit />
                  </button>

                  <button onClick={() => handleDelete(p._id)}>
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
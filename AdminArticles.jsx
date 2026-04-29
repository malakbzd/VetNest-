import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { FaNewspaper, FaEdit, FaTrash } from "react-icons/fa";
import "./AdminArticles.css";

function AdminArticles() {
  const formRef = useRef(null);
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    link: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuthConfig = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }), []);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      image: "",
      link: "",
    });
    setEditingId(null);
  };

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/articles", getAuthConfig());
      setArticles(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`http://localhost:5000/api/articles/${editingId}`, formData, getAuthConfig());
      } else {
        await axios.post("http://localhost:5000/api/articles", formData, getAuthConfig());
      }
      resetForm();
      fetchArticles();
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title || "",
      content: article.content || "",
      category: article.category || "",
      image: article.image || "",
      link: article.link || "",
    });
    setEditingId(article._id);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/articles/${id}`, getAuthConfig());
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-articles-container">
      <h2 className="admin-title">
        <FaNewspaper className="title-icon" />
        Articles
      </h2>

      {/* FORM */}
      <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
        {/* Row 1: Title (left) and Category (right) */}
        <div className="form-row">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="admin-input"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              className="admin-select"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="">Select a category</option>
              <option value="nutrition">Nutrition</option>
              <option value="behavior">Behavior</option>
              <option value="health">Health</option>
              <option value="training">Training</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>

        {/* Row 2: Image URL (full width) */}
        <div className="form-group full">
          <label>Image URL</label>
          <input
            type="text"
            className="admin-input"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
        </div>

        {/* Row 3: Article Link (full width) */}
        <div className="form-group full">
          <label>Article Link</label>
          <input
            type="text"
            className="admin-input"
            placeholder="https://..."
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
        </div>

        {/* Row 4: Content (full width) */}
        <div className="form-group full">
          <label>Content</label>
          <textarea
            className="admin-textarea"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : editingId ? "Update Article" : "Add Article"}
        </button>
      </form>

      {/* LIST */}
      <div className="admin-list">
        {loading && <p className="loading">Loading...</p>}
        {!loading && articles.length === 0 && <p className="no-data">No articles yet</p>}
        {!loading &&
          articles.map((article) => (
            <div key={article._id} className="admin-card">
              <h3>{article.title}</h3>
              {article.image && <img src={article.image} alt={article.title} />}
              <p>{article.content}</p>
              <small>{article.category}</small>
              <div className="admin-actions">
                <button type="button" className="action-btn edit" onClick={() => handleEdit(article)}>
                  <FaEdit />
                </button>
                <button type="button" className="action-btn delete" onClick={() => handleDelete(article._id)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminArticles;
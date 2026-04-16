import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BsNewspaper, BsPencilSquare, BsTrash } from "react-icons/bs";
import "./AdminArticles.css";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
    link: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuthConfig = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }), []);

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      image: "",
      link: ""
    });
    setEditingId(null);
  };

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:5000/api/articles",
        getAuthConfig()
      );
      setArticles(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    try {
      setLoading(true);

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/articles/${editingId}`,
          formData,
          getAuthConfig()
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/articles",
          formData,
          getAuthConfig()
        );
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
      title: article.title,
      content: article.content,
      category: article.category || "",
      image: article.image || "",
      link: article.link || ""
    });
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:5000/api/articles/${id}`,
        getAuthConfig()
      );
      fetchArticles();
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className="admin-articles-container">
      <h2 className="admin-title">
        <BsNewspaper className="title-icon" />
        Articles
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="admin-form">

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="admin-input"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            className="admin-input"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          />
        </div>

        <div className="form-group full">
          <label>Image URL</label>
          <input
            type="text"
            className="admin-input"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
        </div>

        <div className="form-group full">
          <label>Article Link</label>
          <input
            type="text"
            className="admin-input"
            placeholder="https://..."
            value={formData.link}
            onChange={(e) =>
              setFormData({ ...formData, link: e.target.value })
            }
          />
        </div>

        <div className="form-group full">
          <label>Content</label>
          <textarea
            className="admin-textarea"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </div>

        <button className="admin-btn" type="submit" disabled={loading}>
          {loading ? "Loading..." : editingId ? "Update" : "Add"}
        </button>
      </form>

      {/* LIST */}
      <div className="admin-list">

        {loading && <p className="loading">Loading...</p>}

        {!loading && articles.length === 0 && (
          <p className="no-data">No articles yet</p>
        )}

        {!loading && articles.map((article) => (
          <div key={article._id} className="admin-card">
            <h3>{article.title}</h3>

            {article.image && (
              <img src={article.image} alt={article.title} />
            )}

            <p>{article.content}</p>
            <small>{article.category}</small>

            <div className="admin-actions">
              <button onClick={() => handleEdit(article)}>
                <BsPencilSquare />
              </button>

              <button onClick={() => handleDelete(article._id)}>
                <BsTrash />
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default AdminArticles;
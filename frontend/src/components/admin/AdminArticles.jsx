import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { MdOutlineArticle } from "react-icons/md";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./AdminArticles.css";
function AdminArticles() {
  // ========== STATE ==========
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ========== CONFIG ==========
  const getAuthConfig = useCallback(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }), []);

  // ========== RESET ==========
  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      image: ""
    });
    setEditingId(null);
  };

  // ========== FETCH ==========
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/articles",
        getAuthConfig()
      );
      setArticles(res.data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  // ========== CREATE ==========
  const createArticle = async () => {
    await axios.post(
      "http://localhost:5000/api/articles",
      formData,
      getAuthConfig()
    );
  };

  // ========== UPDATE ==========
  const updateArticle = async () => {
    await axios.put(
      `http://localhost:5000/api/articles/${editingId}`,
      formData,
      getAuthConfig()
    );
  };

  // ========== DELETE ==========
  const deleteArticle = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/articles/${id}`,
      getAuthConfig()
    );
  };

  // ========== SUBMIT ==========
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) return;

    setLoading(true);
    try {
      if (editingId) {
        await updateArticle();
      } else {
        await createArticle();
      }
      resetForm();
      fetchArticles();
    } catch (err) {
      console.error("Error saving article:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========== EDIT ==========
  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category || "",
      image: article.image || ""
    });
    setEditingId(article._id);
  };

  // ========== DELETE ==========
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    setLoading(true);
    try {
      await deleteArticle(id);
      fetchArticles();
    } catch (err) {
      console.error("Error deleting:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========== LIFECYCLE ==========
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // ========== RENDER ==========
  return (
    <div className="admin-articles-container">
      <h2 className="admin-title">
        <MdOutlineArticle  /> Articles
      </h2>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Title..."
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          disabled={loading}
        />

        <textarea
          placeholder="Content..."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Category..."
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Image URL..."
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Processing..."
            : editingId
            ? "Update"
            : "Add Article"}
        </button>

        {editingId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* ===== LIST ===== */}
      <div className="admin-list">
        {loading && <p>Loading...</p>}

        {!loading && articles.length === 0 && (
          <p>No articles yet</p>
        )}

        {articles.map((article) => (
          <div key={article._id} className="admin-card">
            <h3>{article.title}</h3>

            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                width="200"
              />
            )}

            <p>{article.content}</p>
            <small>{article.category}</small>

            <div className="admin-actions">
  <button className="edit-btn" onClick={() => handleEdit(article)}>
    <FaEdit />
  </button>

  <button className="delete-btn" onClick={() => handleDelete(article._id)}>
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
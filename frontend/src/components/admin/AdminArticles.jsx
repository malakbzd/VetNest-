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
    image: ""
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
      image: ""
    });
    setEditingId(null);
  };

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/articles",
        getAuthConfig()
      );
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getAuthConfig]);

  const createArticle = async () => {
    await axios.post(
      "http://localhost:5000/api/articles",
      formData,
      getAuthConfig()
    );
  };

  const updateArticle = async () => {
    await axios.put(
      `http://localhost:5000/api/articles/${editingId}`,
      formData,
      getAuthConfig()
    );
  };

  const deleteArticle = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/articles/${id}`,
      getAuthConfig()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setLoading(true);
    try {
      if (editingId) await updateArticle();
      else await createArticle();

      resetForm();
      fetchArticles();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category || "",
      image: article.image || ""
    });
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    setLoading(true);
    try {
      await deleteArticle(id);
      fetchArticles();
    } catch (err) {
      console.error(err);
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
            placeholder="Enter title"
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
            placeholder="Enter category"
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
            placeholder="Paste image link"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />
        </div>

        <div className="form-group full">
          <label>Content</label>
          <textarea
            className="admin-textarea"
            placeholder="Write article..."
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
          />
        </div>

        <div className="form-actions">
          <button className="admin-btn" type="submit">
            {editingId ? "Update Article" : "Add Article"}
          </button>

          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="admin-list">
        {loading && <p className="loading">Loading...</p>}

        {!loading && articles.length === 0 && (
          <p className="no-data">No articles yet</p>
        )}

        {articles.map((article) => (
          <div key={article._id} className="admin-card">
            <h3>{article.title}</h3>

            {article.image && (
              <img src={article.image} alt={article.title} />
            )}

            <p>{article.content}</p>
            <small>{article.category}</small>

            <div className="admin-actions">
              <button
                className="edit-btn"
                onClick={() => handleEdit(article)}
              >
                <BsPencilSquare />
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(article._id)}
              >
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
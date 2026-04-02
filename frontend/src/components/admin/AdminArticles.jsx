import { useEffect, useState } from "react";
import axios from "axios";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Reusable auth header
  const getAuthConfig = () => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/articles",
        getAuthConfig()
      );
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // CREATE or UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/articles/${editingId}`,
          { title, content },
          getAuthConfig()
        );
      } else {
        // CREATE
        await axios.post(
          "http://localhost:5000/api/articles",
          { title, content },
          getAuthConfig()
        );
      }

      setTitle("");
      setContent("");
      setEditingId(null);
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (article) => {
    setTitle(article.title);
    setContent(article.content);
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/articles/${id}`,
        getAuthConfig()
      );
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-articles-container">
      <h2 className="admin-title">Manage Articles</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          placeholder="Article title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="admin-input"
        />

        <textarea
          placeholder="Write your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="admin-textarea"
        />

        <button type="submit" className="admin-btn">
          {editingId ? "Update Article ✏️" : "Add Article ➕"}
        </button>
      </form>

      <div className="admin-list">
        {articles.map((a) => (
          <div key={a._id} className="admin-card">
            <h3>{a.title}</h3>
            <p>{a.content}</p>

            <div className="admin-actions">
              <button onClick={() => handleEdit(a)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(a._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminArticles;
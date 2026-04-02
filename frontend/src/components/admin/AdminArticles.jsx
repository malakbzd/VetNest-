import { useEffect, useState } from "react";
import axios from "axios";

function AdminArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/articles");
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchArticles();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Manage Articles</h2>

      {articles.map((article) => (
        <div key={article._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h3>{article.title}</h3>
          <p>{article.content}</p>

          <button onClick={() => deleteArticle(article._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminArticles;
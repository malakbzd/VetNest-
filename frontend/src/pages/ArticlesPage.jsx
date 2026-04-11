import React, { useState, useEffect } from "react";
import { getArticles } from "../api";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await getArticles();
      setArticles(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", color: "#2c3e50", marginBottom: "2rem" }}>
      Pet Care Articles
      </h1>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "2rem"
      }}>
        {articles.map((article) => (
          <div key={article._id} style={{
            background: "white",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}>
            <img
              src={article.image || "https://via.placeholder.com/400x200"}
              alt={article.title}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "1rem" }}>
              <span style={{
                background: "#e67e22",
                color: "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "20px",
                fontSize: "0.75rem",
                display: "inline-block",
                marginBottom: "0.5rem"
              }}>
                {article.category}
              </span>
              <h3>{article.title}</h3>
              <p>{article.content.substring(0, 100)}...</p>
              <p style={{ color: "#999", fontSize: "0.8rem" }}>
                By {article.author?.name || "Admin"}
              </p>
              <button style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                background: "transparent",
                color: "#3498db",
                border: "2px solid #3498db",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%"
              }}>
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticlesPage;
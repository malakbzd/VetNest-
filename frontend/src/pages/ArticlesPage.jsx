import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ArticlesPage.css";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const fetchArticles = async () => {
    try {
      let url = "http://localhost:5000/api/articles";

      // ✔️ FIX SYNTAX
      if (category) {
        url += `?category=${category}`;
      }

      const res = await axios.get(url);
      setArticles(res.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [category]); // ✔️ يتبدل كي تبدل category

  if (loading) {
    return <div className="articles-loading">Loading...</div>;
  }

  return (
    <div className="articles-container">
      <h1 className="articles-title">Pet Care Articles</h1>

      {/* FILTER */}
      <div className="category-filters">
        <button onClick={() => setCategory("")}>All</button>
        <button onClick={() => setCategory("nutrition")}>Nutrition</button>
        <button onClick={() => setCategory("behavior")}>Behavior</button>
        <button onClick={() => setCategory("health")}>Health</button>
        <button onClick={() => setCategory("training")}>Training</button>
        <button onClick={() => setCategory("general")}>General</button>
      </div>

      {/* DATA */}
      {articles.length === 0 ? (
        <div>No articles found</div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article._id} className="article-card">
              <img
                src={article.image || "https://via.placeholder.com/400x200"}
                alt={article.title}
              />
              <h3>{article.title}</h3>
              <p>{article.content?.substring(0, 100)}...</p>
              <p>{article.category}</p>

              <a href={article.link || "#"} target="_blank" rel="noreferrer">
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticlesPage;
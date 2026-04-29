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
  }, [category]);

  if (loading) {
    return (
      <div className="articles-loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">
          <i className="fas fa-spinner fa-pulse"></i>
          Loading articles...
        </div>
      </div>
    );
  }

  return (
    <div className="articles-container">
      <h1 className="articles-title">
        <i className="fas fa-newspaper"></i>
        Pet Care Articles
      </h1>

    
      <div className="category-filters">
        <button className={category === "" ? "active" : ""} onClick={() => setCategory("")}>All</button>
        <button className={category === "nutrition" ? "active" : ""} onClick={() => setCategory("nutrition")}>Nutrition</button>
        <button className={category === "behavior" ? "active" : ""} onClick={() => setCategory("behavior")}>Behavior</button>
        <button className={category === "health" ? "active" : ""} onClick={() => setCategory("health")}>Health</button>
        <button className={category === "training" ? "active" : ""} onClick={() => setCategory("training")}>Training</button>
  
      </div>

      {articles.length === 0 ? (
        <div className="articles-no-data">
          <i className="fas fa-book-open"></i>
          No articles found. Check back later!
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article) => (
            <div key={article._id} className="article-card">
              <img
                className="article-image"
                src={article.image || "https://via.placeholder.com/400x200"}
                alt={article.title}
              />
              <div className="article-content">
                <span className="article-category">
                  <i className="fas fa-tag"></i>
                  {article.category || "Pet Care"}
                </span>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">
                  {article.content?.substring(0, 100) || "No description"}...
                </p>
                <p className="article-author">
                  <i className="fas fa-user"></i>
                  {article.author?.name || "VetNest Team"}
                </p>
                <a
                  href={article.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-btn"
                >
                  Read More
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ArticlesPage;
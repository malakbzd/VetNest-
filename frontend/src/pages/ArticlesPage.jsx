import React, { useState, useEffect } from "react";
import { getArticles } from "../api";
import "./ArticlesPage.css";

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
                  {article.content?.substring(0, 100)}...
                </p>
                <p className="article-author">
                  <i className="fas fa-user"></i>
                  {article.author?.name || "Admin"}
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
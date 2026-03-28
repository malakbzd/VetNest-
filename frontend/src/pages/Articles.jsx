import { useEffect, useState } from "react";
import { getArticles } from "../services/articleService";
import ArticleCard from "../components/articles/ArticleCard";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then(res => setArticles(res.data));
  }, []);

  return (
    <div>
      <h2>Articles</h2>
      {articles.map(a => <ArticleCard key={a._id} article={a} />)}
    </div>
  );
}
export default function ArticleCard({ article }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{article.title}</h3>
      <p>{article.content}</p>
    </div>
  );
}
const Article = require("../models/Article");

// GET
exports.getArticles = async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
};

// POST
exports.createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
};

// DELETE
exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
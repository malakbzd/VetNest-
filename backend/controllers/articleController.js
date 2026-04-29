const Article = require("../models/Article");

// ================= GET =================
exports.getArticles = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const articles = await Article.find(filter);
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= CREATE =================
exports.createArticle = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ================= UPDATE =================
exports.updateArticle = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!article) {
      return res.status(404).json("Article not found");
    }

    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ================= DELETE =================
exports.deleteArticle = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json("Article not found");
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
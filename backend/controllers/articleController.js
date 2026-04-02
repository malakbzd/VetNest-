const Article = require("../models/Article");

// GET (public or protected — your choice)
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST (ADMIN ONLY)
exports.createArticle = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const article = await Article.create(req.body);
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE (ADMIN ONLY)
exports.updateArticle = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE (ADMIN ONLY)
exports.deleteArticle = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json("Access denied");
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
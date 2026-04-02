const express = require("express");
const router = express.Router();

const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/articleController");

const auth = require("../middleware/authMiddleware");

// Public
router.get("/", getArticles);

// Protected (ADMIN)
router.post("/", auth, createArticle);
router.put("/:id", auth, updateArticle);
router.delete("/:id", auth, deleteArticle);

module.exports = router;
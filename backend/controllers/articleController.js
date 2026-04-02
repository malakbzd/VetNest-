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

exports.updateAppointment = async (req, res) => {
  try {
    let filter;

    if (req.user.role === "admin") {
      // Admin can update any appointment
      filter = { _id: req.params.id };
    } else {
      // User can only update their own
      filter = { _id: req.params.id, user: req.user.id };
    }

    const app = await Appointment.findOneAndUpdate(filter, req.body, {
      new: true,
    });

    res.json(app);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    let filter;

    if (req.user.role === "admin") {
      // Admin can delete any appointment
      filter = { _id: req.params.id };
    } else {
      // User can only delete their own
      filter = { _id: req.params.id, user: req.user.id };
    }

    await Appointment.findOneAndDelete(filter);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
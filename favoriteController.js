const Favorite = require('../models/Favorite');

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user.id }).populate('product');
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { productId } = req.body;
    const existing = await Favorite.findOne({ user: req.user.id, product: productId });
    if (existing) return res.status(400).json({ message: 'Already in favorites' });
    const favorite = await Favorite.create({ user: req.user.id, product: productId });
    await favorite.populate('product');
    res.status(201).json(favorite);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Favorite.findOneAndDelete({ user: req.user.id, product: productId });
    if (!deleted) return res.status(404).json({ message: 'Not in favorites' });
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
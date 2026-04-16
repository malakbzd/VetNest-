const router = require('express').Router();
const protect = require('../middleware/authMiddleware');  // ✅ no curly braces
const { getFavorites, addFavorite, removeFavorite } = require('../controllers/favoriteController');

router.use(protect);
router.get('/', getFavorites);
router.post('/add', addFavorite);
router.delete('/remove/:productId', removeFavorite);

module.exports = router;
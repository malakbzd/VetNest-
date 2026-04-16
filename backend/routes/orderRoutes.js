const router = require('express').Router();
const protect = require('../middleware/authMiddleware');  // ✅ no curly braces
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');

router.use(protect);
router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);

module.exports = router;
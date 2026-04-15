const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (req, res) => {
  try {
    const { deliveryMethod, deliveryAddress, paymentMethod } = req.body;
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    let totalAmount = 0;
    const orderItems = cart.items.map(item => {
      const price = item.product.price;
      totalAmount += price * item.quantity;
      return { product: item.product._id, quantity: item.quantity, price };
    });
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalAmount,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'home_delivery' ? deliveryAddress : undefined,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'paid'
    });
    cart.items = [];
    await cart.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id }).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
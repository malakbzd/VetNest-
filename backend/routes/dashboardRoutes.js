const router = require("express").Router();
const { getDashboard } = require("../controllers/dashboardController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, getDashboard);

module.exports = router;
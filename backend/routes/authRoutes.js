const router = require("express").Router();
const { register, login } = require("../controllers/authController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createAppointment);
router.get("/", auth, getAppointments);
router.put("/:id", auth, updateAppointment);
router.delete("/:id", auth, deleteAppointment);

module.exports = router;
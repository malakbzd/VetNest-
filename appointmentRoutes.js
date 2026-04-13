const router = require("express").Router();
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointmentController");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, createAppointment);
router.get("/", auth, getAppointments);
router.put("/:id", auth, updateAppointment);
router.delete("/:id", auth, deleteAppointment);

module.exports = router;
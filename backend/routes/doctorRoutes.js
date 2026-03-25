const router = require("express").Router();
const ctrl = require("../controllers/doctorController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, ctrl.getDoctors);
router.post("/", auth, ctrl.addDoctor);
router.put("/:id", auth, ctrl.updateDoctor);
router.delete("/:id", auth, ctrl.deleteDoctor);

module.exports = router;
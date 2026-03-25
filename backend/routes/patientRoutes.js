const router = require("express").Router();
const ctrl = require("../controllers/patientController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, ctrl.getPatients);
router.post("/", auth, ctrl.addPatient);
router.put("/:id", auth, ctrl.updatePatient);
router.delete("/:id", auth, ctrl.deletePatient);

module.exports = router;
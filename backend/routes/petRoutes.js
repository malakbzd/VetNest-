const router = require("express").Router();
const { createPet, getPets, updatePet, deletePet } = require("../controllers/petController");
const protect = require("../middleware/authMiddleware"); // ✅ no curly braces

router.use(protect);
router.post("/", createPet);
router.get("/", getPets);
router.put("/:id", updatePet);
router.delete("/:id", deletePet);

module.exports = router;
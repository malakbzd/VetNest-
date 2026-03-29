const router = require("express").Router();
const { createPet, getPets, deletePet } = require("../controllers/petController");

router.post("/", createPet);
router.get("/", getPets);
router.delete("/:id", deletePet);

module.exports = router;
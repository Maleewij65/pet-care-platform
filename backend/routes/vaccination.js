const express = require('express');
const vaccinationController = require('../controllers/vaccination');
const router = express.Router();

router.get("/", vaccinationController.getVaccinations);
router.get("/:id", vaccinationController.getVaccination);
router.post("/", vaccinationController.createVaccination);
router.put("/:id", vaccinationController.updateVaccination);
router.delete("/:id", vaccinationController.deleteVaccination);

module.exports = router;
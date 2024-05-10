const express = require('express');
const adoptionController = require('../controllers/adoption');
const router = express.Router();

router.get("/", adoptionController.getAdoptions);
router.get("/:id", adoptionController.getAdoption);
router.post("/", adoptionController.createAdoption);
router.patch("/:id", adoptionController.updateAdoption);
router.delete("/:id", adoptionController.deleteAdoption);



module.exports = router;
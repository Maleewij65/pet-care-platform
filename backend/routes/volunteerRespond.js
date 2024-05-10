const express = require('express');
const volunteerRespondController = require('../controllers/volunteerRespond');
const router = express.Router();

router.get("/request/:id", volunteerRespondController.getRespondedVolunteersByRequest);
router.get("/", volunteerRespondController.getVolunteerResponds);
router.get("/:id", volunteerRespondController.getVolunteerRespond);
router.post("/", volunteerRespondController.createVolunteerRespond);
router.put("/:id", volunteerRespondController.updateVolunteerRespond);
router.delete("/:id", volunteerRespondController.deleteVolunteerRespond);

module.exports = router;
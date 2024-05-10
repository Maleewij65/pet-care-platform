const express = require('express');
const volunteerRequestController = require('../controllers/volunteerRequest');
const router = express.Router();

router.get("/", volunteerRequestController.getVolunteerRequests);
router.get("/:id", volunteerRequestController.getVolunteerRequest);
router.post("/", volunteerRequestController.createVolunteerRequest);
router.put("/:id", volunteerRequestController.updateVolunteerRequest);
router.delete("/:id", volunteerRequestController.deleteVolunteerRequest);

module.exports = router;
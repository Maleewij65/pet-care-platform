const express = require('express');
const appointmentController = require('../controllers/appointment');
const router = express.Router();

router.get("/", appointmentController.getAppointments);
router.get("/:id", appointmentController.getAppointment);
router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;

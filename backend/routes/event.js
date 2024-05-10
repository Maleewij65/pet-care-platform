const express = require('express');
const eventController = require('../controllers/event');
const router = express.Router();


router.get("/", eventController.getEvents);
router.get("/view", eventController.getViewEvents);
router.get("/:id", eventController.getEvent);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.get("/state/:fundState", eventController.getEventsByFundState);


module.exports = router;
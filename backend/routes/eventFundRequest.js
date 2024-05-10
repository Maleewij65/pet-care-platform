const express = require('express');
const eventFundRequestController = require('../controllers/eventFundRequest');
const router = express.Router();

router.get("/", eventFundRequestController.getEventFundRequests);
router.get("/:id", eventFundRequestController.getEventFundRequest);
router.post("/", eventFundRequestController.createEventFundRequest);
router.put("/:id", eventFundRequestController.updateEventFundRequest);
router.delete("/:id", eventFundRequestController.deleteEventFundRequest);

module.exports = router;
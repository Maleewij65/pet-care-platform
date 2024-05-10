const express = require('express');
const eventAttendController = require('../controllers/eventAttend');
const router = express.Router();

router.post('/', eventAttendController.createEventAttend);
router.get('/', eventAttendController.getEventAttend);
router.get('/:id', eventAttendController.getEventAttendById);
router.get('/event/:id', eventAttendController.getEventAttendByEvent);

module.exports = router;
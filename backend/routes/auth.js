const express = require('express');
const authController = require('../controllers/auth');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.signIn);

router.get('/home', requireAuth, (req, res) => {
   res.json({ user: req.user });
});

module.exports = router;
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();

router.get("/profile/:id", userController.getProfile);
router.get("/doctor/:id", userController.getDoctorProfile);
router.get("/shelter/:id", userController.getShelterProfile);
router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
const express = require('express');
const animalController = require('../controllers/animal');
const router = express.Router();

router.put("/updatev/:id", animalController.updateAnimalVac);

router.get("/", animalController.getAnimals);
router.get("/view", animalController.getViewAnimals);
router.get("/:id", animalController.getAnimal);
router.post("/", animalController.createAnimal);
router.put("/:id", animalController.updateAnimal);
router.delete("/:id", animalController.deleteAnimal);

router.get("/:id/vaccination", animalController.getVaccinationHistory);
router.get("/:id/adoption", animalController.getAdoptionHistory);
router.post("/:id/adoption/check", animalController.checkAnimalAdoption);

module.exports = router;
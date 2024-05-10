const Animal = require('../models/Animal');
const Vaccination = require('../models/vaccination');
const Adoption = require('../models/adoption');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, 'uploads/');
   },
   filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const rand = Math.floor(Math.random() * 900000) + 100000;
      cb(null, Date.now() + '_' + rand + ext);
   }
});

const upload = multer({
   storage: storage,
   fileFilter: function (req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb(new Error('Only image files are allowed!'));
      }
      cb(null, true);
   }
}).fields([
   { name: 'image', maxCount: 1 },
]);


const getAnimals = async (req, res) => {
   try {
      const animals = await Animal.find();
      let updatedAnimals = [];
      for (let i = 0; i < animals.length; i++) {
         const vaccinations = await Vaccination.findOne({ animal: animals[i]._id }).sort({ date: -1 });
         const adoptions = await Adoption.find({ animal: animals[i]._id }).sort({ date: -1 });
         let adoption, vaccination, vaccinationName;
         adoption = adoptions.length > 0 ? adoptions : [];
         vaccination = vaccinations ? vaccinations.createdAt : "Not Vaccinated";
         vaccinationName = vaccinations ? vaccinations.vaccine : "-";
         updatedAnimals.push({ ...animals[i]._doc, lastVaccination: vaccination, adoption: adoption, vaccinationName: vaccinationName });
      }
      return res.status(200).json(updatedAnimals);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}
const getViewAnimals = async (req, res) => {
   try {
      const animals = await Animal.find({ state: 'AVAILABLE' });
      let updatedAnimals = [];
      for (let i = 0; i < animals.length; i++) {
         const vaccinations = await Vaccination.findOne({ animal: animals[i]._id }).sort({ date: -1 });
         const adoptions = await Adoption.find({ animal: animals[i]._id }).sort({ date: -1 });
         let adoption, vaccination, vaccinationName;
         adoption = adoptions.length > 0 ? adoptions : [];
         vaccination = vaccinations ? vaccinations.createdAt : "Not Vaccinated";
         vaccinationName = vaccinations ? vaccinations.vaccine : "-";
         updatedAnimals.push({ ...animals[i]._doc, lastVaccination: vaccination, adoption: adoption, vaccinationName: vaccinationName });
      }
      return res.status(200).json(updatedAnimals);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getAnimal = async (req, res) => {
   const { id } = req.params;
   try {
      const animal = await Animal.findById(id);
      return res.status(200).json(animal);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const updateAnimalVac = async (req, res) => {
   try {
      const { id } = req.params;
      const { vaccinationFrequency } = req.body;
      const animal = await Animal.findById(id);
      if (!animal) {
         return res.status(404).json({ error: true, message: "Animal not found" });
      }
      animal.vaccinationFrequency = vaccinationFrequency;
      const a = await animal.save();
      return res.status(200).json(a);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const createAnimal = async (req, res) => {
   try {
      upload(req, res, async (err) => {
         const { name, type, age, color, weight, adoptionFee, vaccinationFrequency } = req.body;
         if (name == '' || type == '' || age == '' || color == '' || weight == '' || adoptionFee == '' || vaccinationFrequency == '') {
            const filePath = req.files.image[0].path;
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: true, message: "Please fill all fields" });
         }
         const image = req.files.image[0].filename;
         if (err) {
            return res.status(500).json({ error: true, message: "Error uploading image:" + err.message });
         }
         const newAnimal = new Animal({
            name,
            type,
            image,
            age,
            color,
            weight,
            adoptionFee,
            vaccinationFrequency,
         });
         const a = await newAnimal.save();
         return res.status(200).json(a);
      });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const updateAnimal = async (req, res) => {
   try {
      upload(req, res, async (err) => {
         const { id } = req.params;
         const { name, type, age, color, weight, adoptionFee, vaccinationFrequency } = req.body;

         if (name == '' || type == '' || age == '' || color == '' || weight == '' || adoptionFee == '' || vaccinationFrequency == '') {
            const filePath = req.files.image[0].path;
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: true, message: "Please fill all fields" });
         }

         const image = req.files.image != undefined && req.files.image[0] != undefined ? req.files.image[0].filename : null;

         if (err) {
            return res.status(500).json({ error: true, message: "Error uploading image:" + err.message });
         }

         const animal = await Animal.findById(id);

         if (!animal) {
            const filePath = req.files.image[0].path;
            fs.unlinkSync(filePath);
            return res.status(404).json({ error: true, message: "Animal not found" });
         }

         const oldImage = animal.image;
         animal.name = name;
         animal.type = type;
         animal.age = age;
         animal.color = color;
         animal.weight = weight;
         animal.adoptionFee = adoptionFee;
         animal.vaccinationFrequency = vaccinationFrequency;
         if (image) { animal.image = image; }
         const filePath = 'uploads/' + oldImage;
         try {
            if (fs.existsSync(filePath) && image) {
               fs.unlinkSync(filePath);
            }
         } catch (ignore) {
         }
         const a = await animal.save();
         return res.status(200).json(a);
      });

   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const deleteAnimal = async (req, res) => {
   try {
      const { id } = req.params;
      const animal = await Animal.findById(id);
      if (!animal) {
         return res.status(404).json({ error: true, message: "Animal not found" });
      }
      const filePath = 'uploads/' + animal.image;
      try {
         if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
         }
      } catch (ignore) {
      }
      await animal.deleteOne();
      await Vaccination.deleteMany({ animal: id });
      await Adoption.deleteMany({ animal: id });
      return res.status(200).json({ error: false, message: "Animal deleted successfully" });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getVaccinationHistory = async (req, res) => {
   const { id } = req.params;
   try {
      const animal = await Animal.findById(id);
      if (!animal) {
         return res.status(404).json({ error: true, message: "Animal not found" });
      }
      const vaccinations = await Vaccination.find({ animal: id }).sort({ date: -1 });
      return res.status(200).json(vaccinations);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getAdoptionHistory = async (req, res) => {
   const { id } = req.params;
   try {
      const animal = await Animal.findById(id);
      if (!animal) {
         return res.status(404).json({ error: true, message: "Animal not found" });
      }
      const adoptions = await Adoption.find({ animal: id }).sort({ date: -1 });
      return res.status(200).json(adoptions);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const checkAnimalAdoption = async (req, res) => {
   const { id } = req.params;
   const { user } = req.body;
   try {
      const adoption = await Adoption.findOne({ animal: id, user: user });
      if (adoption) {
         return res.status(200).json({ error: false, adopted: true });
      }
      return res.status(200).json({ error: false, adopted: false });
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}


module.exports = {
   getAnimals,
   getAnimal,
   createAnimal,
   updateAnimal,
   deleteAnimal,
   getVaccinationHistory,
   getAdoptionHistory,
   checkAnimalAdoption,
   getViewAnimals,
   updateAnimalVac
};
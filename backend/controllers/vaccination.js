const Vaccination = require('../models/vaccination');
const Appointment = require('../models/appointment');

const getVaccinations = async (req, res) => {
   try {
      const vaccinations = await Vaccination.find();
      return res.status(200).json(vaccinations);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getVaccination = async (req, res) => {
   try {
      const { id } = req.params;
      const vaccination = await Vaccination.findById(id);
      if (!vaccination) {
         return res.status(404).json({ error: true, message: "Vaccination not found" });
      }
      return res.status(200).json(vaccination);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const createVaccination = async (req, res) => {
   try {
      const { animal, vaccine } = req.body;
      const appointment = await Appointment.findOne({ animal: animal, state: 'APPROVED' });
      if (!appointment) {
         return res.status(404).json({ error: true, message: "Appointment not found" });
      }
      appointment.state = 'COMPLETED';
      await appointment.save();
      const newVaccination = new Vaccination({
         animal,
         vaccine,
         state: 'COMPLETED',
      });
      const a = await newVaccination.save();
      return res.status(200).json(a);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const updateVaccination = async (req, res) => {
   try {
      const { id } = req.params;
      const { animal, vaccine, date } = req.body;
      const vaccination = await Vaccination.findById(id);
      if (!vaccination) {
         return res.status(404).json({ error: true, message: "Vaccination not found" });
      }
      vaccination.animal = animal;
      vaccination.vaccine = vaccine;
      vaccination.date = date;
      await vaccination.save();
      return res.status(200).json(vaccination);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const deleteVaccination = async (req, res) => {
   try {
      const { id } = req.params;
      const vaccination = await Vaccination.findById(id);
      if (!vaccination) {
         return res.status(404).json({ error: true, message: "Vaccination not found" });
      }
      await vaccination.remove();
      return res.status(200).json({ error: false, message: "Vaccination deleted successfully" });
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

module.exports = { getVaccinations, getVaccination, createVaccination, updateVaccination, deleteVaccination };
const Appointment = require('../models/appointment');

const getAppointments = async (req, res) => {
   try {
      const appointments = await Appointment.find();
      return res.status(200).json(appointments);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}


const getAppointment = async (req, res) => {
   try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id);
      if (!appointment) {
         return res.status(404).json({ error: true, message: "Appointment not found" });
      }
      return res.status(200).json(appointment);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const createAppointment = async (req, res) => {
   try {
      let appointment = new Appointment(req.body);
      const isPending = await Appointment.findOne({ animal: appointment.animal, state: 'PENDING' });
      if (isPending) {
         return res.status(400).json({ error: true, message: "There is already a pending appointment for this animal" });
      }
      const isApproved = await Appointment.findOne({ animal: appointment.animal, state: 'APPROVED' });
      if (isApproved) {
         return res.status(400).json({ error: true, message: "This animal has an approved appointment" });
      }
      appointment.reason = "-";
      await appointment.save();
      return res.status(200).json({ error: false, message: "Appointment created successfully" });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const updateAppointment = async (req, res) => {
   try {
      const { id } = req.params;
      const appointment = await Appointment
         .findByIdAndUpdate(id, req.body, { new: true });
      if (!appointment) {
         return res.status(404).json({ error: true, message: "Appointment not found" });
      }
      return res.status(200).json({ error: false, message: "Appointment updated successfully" });
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const deleteAppointment = async (req, res) => {
   try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id);
      if (!appointment) {
         return res.status(404).json({ error: true, message: "Appointment not found" });
      }
      await appointment.deleteOne();
      return res.status(200).json({ error: false, message: "Appointment deleted successfully" });
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}


module.exports = {
   getAppointments,
   getAppointment,
   createAppointment,
   updateAppointment,
   deleteAppointment
}


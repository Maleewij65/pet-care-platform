const EventAttend = require('../models/eventAttend');

const createEventAttend = async (req, res) => {
   const { event, email, mobile, name } = req.body;
   if (!event || !email || !mobile || !name) {
      return res.status(400).json({ error: true, message: "Please fill all fields" });
   }
   try {


      const existingEventAttend = await EventAttend.findOne({ event, email });
      if (existingEventAttend) {
         return res.status(400).json({ error: true, message: "Email already registered for this event" });
      }
      const eventAttend = await EventAttend.create({ event, email, mobile, name });
      return res.status(200).json(eventAttend);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getEventAttend = async (req, res) => {
   try {
      const eventAttend = await EventAttend.find();
      return res.status(200).json(eventAttend);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getEventAttendById = async (req, res) => {
   const { id } = req.params;
   try {
      const eventAttend = await EventAttend.findById(id);
      return res.status(200).json(eventAttend);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getEventAttendByEvent = async (req, res) => {
   const { id } = req.params;
   try {
      const eventAttend = await EventAttend.find({ event: id });
      return res.status(200).json(eventAttend);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

module.exports = {
   createEventAttend,
   getEventAttend,
   getEventAttendById,
   getEventAttendByEvent,
}
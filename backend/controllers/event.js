const Event = require('../models/event');
const EventAttend = require('../models/eventAttend');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const e = require('express');

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

const getEvents = async (req, res) => {
   try {
      const events = await Event.find();
      let updatedEvents = [];
      for (let i = 0; i < events.length; i++) {
         const eventAttend = await EventAttend.find({ event: events[i]._id });
         updatedEvents.push({ ...events[i]._doc, attendees: eventAttend.length });
      }
      return res.status(200).json(updatedEvents);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getViewEvents = async (req, res) => {
   try {
      const events = await Event.find({ state: 'ACTIVE', fundState: 'APPROVED' });
      let updatedEvents = [];
      for (let i = 0; i < events.length; i++) {
         const eventAttend = await EventAttend.find({ event: events[i]._id });
         updatedEvents.push({ ...events[i]._doc, attendees: eventAttend.length });
      }
      return res.status(200).json(updatedEvents);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getEvent = async (req, res) => {
   const { id } = req.params;
   try {
      const event = await Event.findById(id);
      return res.status(200).json(event);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}



const createEvent = async (req, res) => {
   try {
      upload(req, res, async (err) => {
         const { name, description, date, time, location, user, fundState, state } = req.body;
         if (name == '' || description == '' || date == '', time == '' || location == '' || user == '' || fundState == '' || state == '') {
            const filePath = req.files.image[0].path;
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: true, message: "Please fill all fields" });
         }
         const image = req.files.image[0].filename;
         if (err) {
            return res.status(500).json({ error: true, message: "Error uploading image:" + err.message });
         }
         const event = new Event({ name, description, date, time, location, image, user, fundState, state });
         const a = await event.save();
         return res.status(201).json(a);
      });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const updateEvent = async (req, res) => {
   try {
      upload(req, res, async (err) => {
         const { id } = req.params;
         const { name, description, date, time, location, user, state } = req.body;

         if (name == '' || description == '' || date == '', time == '' || location == '' || user == '' || state == '') {
            const filePath = req.files.image[0].path;
            fs.unlinkSync(filePath);
            return res.status(400).json({ error: true, message: "Please fill all fields" });
         }

         const image = req.files.image != undefined && req.files.image[0] != undefined ? req.files.image[0].filename : null;

         if (err) {
            return res.status(500).json({ error: true, message: "Error uploading image:" + err.message });
         }

         const event = await Event.findById(id);

         if (!event) {
            const filePath = req.files.image[0].path;
            fs.unlinkSync(filePath);
            return res.status(404).json({ error: true, message: "Event not found" });
         }

         const oldImage = event.image;
         event.name = name;
         event.description = description;
         event.date = date;
         event.time = time;
         event.location = location;
         if (image) { event.image = image; }
         event.user = user;
         event.state = state;
         const filePath = 'uploads/' + oldImage;
         try {
            if (fs.existsSync(filePath) && image) {
               fs.unlinkSync(filePath);
            }
         } catch (ignore) {
         }
         const a = await event.save();
         return res.status(200).json(a);
      });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const deleteEvent = async (req, res) => {
   try {
      const { id } = req.params;
      const event = await Event.findById(id);
      if (!event) {
         return res.status(404).json({ error: true, message: "Event not found" });
      }
      const filePath = 'uploads/' + event.image;
      try {
         if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
         }
      } catch (ignore) {
      }
      await event.deleteOne();
      return res.status(200).json({ error: false, message: "Event deleted successfully" });
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getEventsByFundState = async (req, res) => {
   const { fundState } = req.params;
   try {
      const events = await Event.find({ fundState });
      if (!events) {
         return res.status(404).json({ error: true, message: "Events not found" });
      }
      return res.status(200).json(events);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent, getEventsByFundState, getViewEvents };
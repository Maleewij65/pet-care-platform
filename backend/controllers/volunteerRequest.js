const VolunteerRequest = require('../models/VolunteerRequest');
const volunteerResponds = require('../models/VolunteerRespond');


const getVolunteerRequests = async (req, res) => {
   try {
      const volunteerRequests = await VolunteerRequest.find();
      return res.status(200).json(volunteerRequests);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getVolunteerRequest = async (req, res) => {
   try {
      const { id } = req.params;
      const volunteerRequest = await VolunteerRequest.findById(id);
      if (!volunteerRequest) {
         return res.status(404).json({ error: true, message: "Volunteer Request not found" });
      }
      return res.status(200).json(volunteerRequest);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const createVolunteerRequest = async (req, res) => {
   try {
      const { skill, description, district, maxVolunteers, onDate } = req.body;
      const newVolunteerRequest = new VolunteerRequest({
         skill,
         description,
         district,
         maxVolunteers,
         onDate,
      });
      const a = await newVolunteerRequest.save();
      return res.status(200).json(a);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const updateVolunteerRequest = async (req, res) => {
   try {
      const { id } = req.params;
      const { skill, description, district, maxVolunteers, onDate } = req.body;
      const volunteerRequest = await VolunteerRequest.findById(id);
      if (!volunteerRequest) {
         return res.status(404).json({ error: true, message: "VolunteerRequest not found" });
      }
      volunteerRequest.skill = skill;
      volunteerRequest.description = description;
      volunteerRequest.district = district;
      volunteerRequest.maxVolunteers = maxVolunteers;
      volunteerRequest.onDate = onDate;
      await volunteerRequest.save();
      return res.status(200).json(volunteerRequest);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const deleteVolunteerRequest = async (req, res) => {
   try {
      const { id } = req.params;
      const volunteerRequest = await VolunteerRequest.findById(id);
      if (!volunteerRequest) {
         return res.status(404).json({ error: true, message: "Volunteer Request not found" });
      }
      await volunteerResponds.deleteMany({ volunteerRequest: id });
      await volunteerRequest.deleteOne();
      return res.status(200).json({ error: false, message: "Volunteer Request deleted successfully" });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

module.exports = {
   getVolunteerRequests,
   getVolunteerRequest,
   createVolunteerRequest,
   updateVolunteerRequest,
   deleteVolunteerRequest,
};
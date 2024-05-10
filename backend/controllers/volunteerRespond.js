const VolunteerRequest = require('../models/VolunteerRequest');
const VolunteerRespond = require('../models/VolunteerRespond');
const User = require('../models/user');

const getVolunteerResponds = async (req, res) => {
   try {
      const volunteerResponds = await VolunteerRespond.find();
      return res.status(200).json(volunteerResponds);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getVolunteerRespond = async (req, res) => {
   try {
      const { id } = req.params;
      const volunteerRespond = await VolunteerRespond.findById(id);
      if (!volunteerRespond) {
         return res.status(404).json({ error: true, message: "VolunteerRespond not found" });
      }
      return res.status(200).json(volunteerRespond);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const createVolunteerRespond = async (req, res) => {
   try {
      const { user, volunteerRequest } = req.body;

      const existingVolunteerRespond = await VolunteerRespond.findOne({ user, volunteerRequest });
      if (existingVolunteerRespond) {
         return res.status(400).json({ error: true, message: "Volunteer Respond already exists" });
      }

      const vR = await VolunteerRequest.findById(volunteerRequest);
      console.log(volunteerRequest)
      if (!vR) {
         return res.status(404).json({ error: true, message: "Volunteer Request not found" });
      }
      const vRR = await VolunteerRequest.find({ _id: volunteerRequest });

      if (vR.maxVolunteers <= vRR.length) {
         return res.status(400).json({ error: true, message: "No more volunteers can be added" });
      }

      const newVolunteerRespond = new VolunteerRespond({
         volunteerRequest,
         user,
      });
      const a = await newVolunteerRespond.save();
      return res.status(200).json({ error: false, message: "Volunteer Respond created successfully", data: a });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const updateVolunteerRespond = async (req, res) => {
   try {
      const { id } = req.params;
      const { user, volunteerRequest } = req.body;
      const volunteerRespond = await VolunteerRespond.findById(id);
      if (!volunteerRespond) {
         return res.status(404).json({ error: true, message: "VolunteerRespond not found" });
      }
      volunteerRespond.user = user;
      volunteerRespond.volunteerRequest = volunteerRequest;
      await volunteerRespond.save();
      return res.status(200).json({ error: false, message: "VolunteerRespond updated successfully" });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const deleteVolunteerRespond = async (req, res) => {
   try {
      const { id } = req.params;
      const userId = req.body.userId;
      // const volunteerRespond = await VolunteerRespond.findById(id);
      const vR = await VolunteerRequest.findById(id);
      const volunteerRespond = await VolunteerRespond.findOne({ volunteerRequest: id, user: userId });
      if (!volunteerRespond) {
         return res.status(404).json({ error: true, message: "VolunteerRespond not found" });
      }
      await volunteerRespond.deleteOne();
      return res.status(200).json({ error: false, message: "VolunteerRespond deleted successfully" });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getRespondedVolunteersByRequest = async (req, res) => {
   try {
      const { id } = req.params;
      const volunteerRespond = await VolunteerRespond.find({ volunteerRequest: id });
      return res.status(200).json(volunteerRespond);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}


module.exports = {
   getVolunteerResponds,
   getVolunteerRespond,
   createVolunteerRespond,
   updateVolunteerRespond,
   deleteVolunteerRespond,
   getRespondedVolunteersByRequest
};

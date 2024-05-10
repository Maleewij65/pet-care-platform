const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adoption = require('../models/adoption');
const VolunteerRequest = require('../models/VolunteerRequest');
const VolunteerRespond = require('../models/VolunteerRespond');
const Appointment = require('../models/appointment');
const Vaccination = require('../models/vaccination');

const updateUser = async (req, res) => {
   const { username, email, password, role } = req.body;
   const { id } = req.params;
   if (username === "" || email === "" || password === "") {
      return res.status(400).json({ error: true, message: "Please fill all fields" });
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   try {
      await User.findByIdAndUpdate(id, {
         username,
         email,
         password: hashedPassword,
         role: role || "USER",
      });
      return res.status(201).json({ error: true, message: "User updated successfully" });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const deleteUser = async (req, res) => {
   const { id } = req.params;
   try {
      await User.findByIdAndDelete(id);
      return res.status(201).json({ error: true, message: "User deleted successfully" });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getUsers = async (req, res) => {
   try {
      const users = await User.find();
      return res.status(200).json(users);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getUser = async (req, res) => {
   const { id } = req.params;
   try {
      const user = await User.findById(id);
      return res.status(200).json(user);
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const createUser = async (req, res) => {
   const { username, email, password, role } = req.body;
   console.log(req.body);
   if (username === "" || email === "" || password === "") {
      return res.status(400).json({ error: true, message: "Please fill all fields" });
   }
   if (await User.findOne({ email })) {
      return res.status(400).json({ error: true, message: "User already exists" });
   }
   const hashedPassword = await bcrypt.hash(password, 10);
   const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "USER",
   });
   try {
      const u = await newUser.save();
      return res.status(201).json(u);
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getProfile = async (req, res) => {
   const { id } = req.params;
   try {
      const user = await User.findById(id);
      const adoptions = await adoption.find({ user: id });
      const volunteerResponds = await VolunteerRespond.find({ user: id });
      let volunteerRequests = [];
      for (let i = 0; i < volunteerResponds.length; i++) {
         const volunteerRequest = await VolunteerRequest.findById(volunteerResponds[i].volunteerRequest);
         volunteerRequests.push(volunteerRequest);
      }
      return res.status(200).json({ user, adoptions, volunteerRequests });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getDoctorProfile = async (req, res) => {
   const { id } = req.params;
   try {
      const user = await User.findById(id);
      const appointments = await Appointment.find({ state: "PENDING" });
      return res.status(200).json({ user, appointments });
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const getShelterProfile = async (req, res) => {
   const { id } = req.params;
   try {
      const user = await User.findById(id);
      const adoptions = await adoption.find({ state: "PENDING" });
      const appointments = await Appointment.find({ state: { $in: ["APPROVED", "REJECTED"] } });
      const volunteerResponds = await VolunteerRespond.find({ state: "ACTIVE" });
      return res.status(200).json({ user, adoptions, appointments, volunteerResponds });
   }
   catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}


module.exports = {
   updateUser,
   deleteUser,
   getUsers,
   getUser,
   createUser,
   getProfile,
   getDoctorProfile,
   getShelterProfile,
};
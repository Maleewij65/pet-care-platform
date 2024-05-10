const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_SECRET = config.get('jwtSecret');


const signUp = async (req, res) => {
   const { username, email, password, role } = req.body;
   if (username === "" || email === "" || password === "") {
      return res.status(400).json({ error: true, message: "Please fill all fields" });
   }
   const existing = await User.findOne({ email });
   if (existing) {
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
      const token = jwt.sign({ email: u.email, id: u._id, role: u.role }, JWT_SECRET, { expiresIn: "6h" });
      return res.status(200).json({ result: u, token });
   } catch (error) {
      return res.status(500).json({ error: true, message: error.message });
   }
}

const signIn = async (req, res) => {
   const { email, password } = req.body;
   if (email === "" || password === "") {
      return res.status(200).json({ error: true, message: "Please fill all fields" });
   }
   const user = await User.findOne({ email });
   if (!user) {
      return res.status(200).json({ error: true, message: "User does not exist" });
   }
   const isPasswordCorrect = await bcrypt.compare(password, user.password);
   if (!isPasswordCorrect) {
      return res.status(200).json({ error: true, message: "Invalid credentials" });
   }
   const token = jwt.sign({ email: user.email, id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "6h" });
   return res.status(200).json({ result: user, token });
}

module.exports = { signUp, signIn };
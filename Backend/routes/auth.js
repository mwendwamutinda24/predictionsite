const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Register = require('../model/register');
const Site = require('../model/site');

const router = express.Router();

// ✅ Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, number, password } = req.body;

    // Check if email already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user (status defaults to "user" in schema)
    const register = new Register({
      name,
      email,
      number,
      password: hashedPassword
    });

    await register.save();

    // Sign JWT including status
    const token = jwt.sign(
      { id: register._id, email: register.email, status: register.status },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '240h' }
    );

    return res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error in /auth/register:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Sign JWT including status
    const token = jwt.sign(
      { id: user._id, email: user.email, status: user.status },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '240h' }
    );

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in /auth/login:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add new site
router.post('/site', async (req, res) => {
  try {
    const { time, home, away, prediction, odds, league } = req.body;
    const site = new Site({ time, home, away, prediction, odds, league });
    await site.save();
    return res.status(201).json({ message: "Prediction registered successfully", site });
  } catch (error) {
    console.error("Error in /auth/site:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all sites
router.get('/sites', async (req, res) => {
  try {
    const sites = await Site.find().sort({ createdAt: -1 });
    res.json(sites);
  } catch (error) {
    console.error("Error in /auth/sites:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update site (score + status)
router.put('/sites/:id', async (req, res) => {
  try {
    const { score, status } = req.body;
    const updated = await Site.findByIdAndUpdate(
      req.params.id,
      { score, status },
      { new: true } // return updated document
    );
    if (!updated) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error("Error in /auth/sites/:id PUT:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get site by ID
router.get('/sites/:id', async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.json(site);
  } catch (error) {
    console.error("Error in /auth/sites/:id GET:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Create default admin (runs once)
async function createDefaultAdmin() {
  try {
    const existingAdmin = await Register.findOne({ email: "kimanzimartinson@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("ziggymartohH12", 10);

    const admin = new Register({
      name: "Ziggy Marto",
      email: "kimanzimartinson@gmail.com", // fixed: no leading space
      number: "0743163313",
      password: hashedPassword,
      status: "admin"
    });

    await admin.save();
    console.log("Default admin created with email kimanzimartinson@gmail.com and password ziggymartohH12");
  } catch (err) {
    console.error("Error creating admin:", err);
  }
}

createDefaultAdmin();

module.exports = router;

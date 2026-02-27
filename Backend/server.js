const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const Register = require('./model/register');
const bcrypt = require('bcrypt');

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "https://predictionsite-gr8r.vercel.app", // no trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use('/auth', authRoutes);

// ✅ Connect to MongoDB and seed admin
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDb Connected successfully");

    // Seed admin once
    const existingAdmin = await Register.findOne({ email: "kimanzimartinson@gmail.com" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("ziggymartohH12", 10);
      const admin = new Register({
        name: "Ziggy Marto",
        email: "kimanzimartinson@gmail.com",
        number: "0743163313",
        password: hashedPassword,
        status: "admin"
      });
      await admin.save();
      console.log("✅ Default admin created with email kimanzimartinson@gmail.com and password ziggymartohH12");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  })
  .catch(err => console.error("Mongo connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

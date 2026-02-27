const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth'); 

const app = express();


app.use(cors({
  origin: "https://predictionsite-gr8r.vercel.app", // no trailing slash
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


app.use('/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDb Connected successfully"))
  .catch(err => console.log(err));

const existingAdmin = await Register.findOne({ email: "kimanzimartinson@gmail.com" }); if (!existingAdmin) { const hashedPassword = await bcrypt.hash("ziggymartohH12", 10); const admin = new Register({ name: "Ziggy Marto", email: "kimanzimartinson@gmail.com", number: "0743163313", password: hashedPassword, status: "admin" }); await admin.save(); console.log("Default admin created with email kimanzimartinson@gmail.com and password ziggymartohH12"); } }) .catch(err => console.error(err));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

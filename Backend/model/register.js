const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  password: { type: String, required: true },
  
  // ✅ Added role/status field
  status: { 
    type: String, 
    enum: ["admin", "user"],  // restricts values to admin or user
    default: "user"           // default is user
  }
});

module.exports = mongoose.model("Register", registerSchema);

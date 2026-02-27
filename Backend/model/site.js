const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  time: { type: String, required: true },  
  home: { type: String, required: true },
  away: { type: String, required: true },
  league: { type: String, required: true },
  prediction: { type: String, required: true },
  odds: { type: String, required: true },
  status: { type: String, default: "pending" },
  score: { type: String, default: "" },   // ✅ added score field
  predictionDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Site', siteSchema);

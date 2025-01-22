const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  maxSize: { type: Number, default: 5 },
});

module.exports = mongoose.model("Team", teamSchema);

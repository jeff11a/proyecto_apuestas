const mongoose = require("mongoose");

//A schema of mongoose represents a model of our user
//These are the properties that we need to fill out
/*A model of how our data will look like*/
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  dateBirth: {
    required: true,
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema);

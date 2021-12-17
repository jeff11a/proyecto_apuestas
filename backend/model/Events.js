const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
  evento: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  participantes: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Events", eventsSchema);

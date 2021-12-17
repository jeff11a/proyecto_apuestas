const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  idUser: {
    type: String,
    required: true,
  },
  victoria: {
    type: Boolean,
  },
  apuesta: {
    type: String,
    required: true,
  },
  ganador: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  ganancia: {
    type: Number,
    min: 0,
    max: 9999999999999999,
  },
  perdida: {
    type: Number,
    min: 0,
    max: 9999999999999999,
  },
});

module.exports = mongoose.model("History", historySchema);

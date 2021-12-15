const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.users = require("./user.model.js")(mongoose, mongoosePaginate);
db.bets = require("./bet.model.js")(mongoose, mongoosePaginate);
db.role = require("./role.model");

db.ROLES = ["Cliente", "Admin", "Interno"];

module.exports = db;
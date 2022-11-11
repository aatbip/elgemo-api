const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  room: String,
  socketId: String,
  users: Number,
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;

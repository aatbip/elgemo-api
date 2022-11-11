const Room = require("../models/Room");

const getRooms = async () => {
  let users = await Room.find({ users: { $eq: 1 } });
  return users;
};

const createRooms = async (socketId, room) => {
  let users = new Room({
    room,
    socketId,
    users: 1,
  });

  await users.save();
};

const updateRooms = async (room) => {
  let _room = await Room.findOneAndUpdate({ room: room }, { users: 2 });
  return _room;
};

const deleteRoom = async (room) => {
  await Room.deleteOne({ room: room });
};

const deleteRoomUsingSocketId = async (id) => {
  await Room.deleteOne({ socketId: id });
};

module.exports = {
  getRooms,
  createRooms,
  updateRooms,
  deleteRoom,
  deleteRoomUsingSocketId,
};

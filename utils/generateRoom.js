const { v4: uuidv4 } = require("uuid");

const generateRoom = () => {
  return `room-${uuidv4()}`;
};

module.exports = generateRoom;

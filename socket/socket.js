const {
  getRooms,
  createRooms,
  updateRooms,
  deleteRoom,
  deleteRoomUsingSocketId,
} = require("../controllers/socket.controller");

const generateRoom = require("../utils/generateRoom");

let count = 1;
const socketController = (io) => {
  io.on("connection", async (socket) => {
    count++;
    socket.on("login", async (callback) => {
      io.emit("total", count);

      let users = await getRooms();
      if (users.length <= 0) {
        let room = generateRoom();
        room = room;
        createRooms(socket.id, room);
        socket.emit("notification", { notice: "Waiting for someone..." });

        socket.join(room);
        socket.in(room).emit("notification", { notice: "Stranger has joined" });
        io.in(room).emit("room", room);
        return;
      } else if (users.length >= 1) {
        let selectedUser = users[0];
        updateRooms(selectedUser.room);
        socket.join(selectedUser.room);
        socket
          .in(selectedUser.room)
          .emit("notification", { notice: "Stranger has joined" });
        io.in(selectedUser.room).emit("room", selectedUser.room);
        return;
      }
      callback();
    });

    socket.on("sendMessage", async ({ message, room }) => {
      socket.in(room).emit("message", { message: message });
    });

    socket.on("leaveroom", ({ room }) => {
      console.log("Stranger left room!");
      deleteRoom(room);
      io.in(room).emit("notification", { notice: "Stranger has left" });
    });

    socket.on("disconnect", () => {
      count--;
      console.log("Stranger Disconnected");
      deleteRoomUsingSocketId(socket.id);
    });
  });
};

module.exports = socketController;

import { generateMessage } from "../utils/messages";
import { addUser, getUser, getUsersInRoom, removeUser } from "../utils/users";

const socketioApp = (server: any) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket: any) => {
    console.log("New socket connection!");

    socket.on(
      "join",
      (
        { username, room }: { username: string; room: string },
        callback: (item: any) => void
      ) => {
        const { error, user } = addUser({ id: socket.id, username, room });

        if (error) {
          return callback(error);
        }

        socket.join(user?.room);

        socket.emit("message", generateMessage("Welcome!"));
        socket.broadcast
          .to(user?.room)
          .emit("message", generateMessage(`${user?.username} has joined!`));
        io.to(user?.room).emit("roomData", {
          room: user?.room,
          users: getUsersInRoom(user?.room),
        });

        callback("Joined!");
      }
    );

    socket.on(
      "sendMessage",
      (message: string, callback: (item: any) => void) => {
        const user = getUser(socket.id);
        io.to(user?.room).emit("message", generateMessage(message));
        callback("Delivered");
      }
    );

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user?.room).emit(
          "message",
          `A ${user.username} has disconnected!`
        );
        io.to(user?.room).emit("roomData", {
          room: user?.room,
          users: getUsersInRoom(user.room),
        });
      }
    });
  });
};

export default socketioApp;

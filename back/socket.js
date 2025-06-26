const SocketIO = require("socket.io");

const onlineMap = {};
module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "http://localhost:5173",
    },
  });
  app.set("io", io);
  app.set("onlineMap", onlineMap);
  const dynamicNsp = io.of(/^\/ws-.+$/).on("connect", (socket) => {
    const newNamespace = socket.nsp; // newNamespace.name === '/dynamic-101'
    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }
    // broadcast to all clients in the given sub-namespace
    socket.emit("hello", socket.nsp.name);
    socket.on("login", ({ id, channels }) => {
      console.log("🎃🎃login🎃🎃", socket.nsp.name);
      onlineMap[socket.nsp.name][socket.id] = id;
      newNamespace.emit(
        "onlineList",
        Object.values(onlineMap[socket.nsp.name])
      );
      channels.forEach((channel) => {
        socket.join(`${socket.nsp.name}-${channel}`);
      });
    });
    socket.on("disconnect", () => {
      console.log("🎁🎁disconnet🎁🎁", socket.nsp.name);
      delete onlineMap[socket.nsp.name][socket.id];
      newNamespace.emit(
        "onlineList",
        Object.values(onlineMap[socket.nsp.name])
      );
    });
  });
};

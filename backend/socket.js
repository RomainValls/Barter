// const { Server } = require("socket.io");

// const io = new Server({
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["my-custom-header"],
//     credentials: true,
//     transports: ["websocket", "polling"],
//   },
// });

// const userSockets = new Map();

// function getUserSockets() {
//   return userSockets;
// }

// io.on("connection", (socket) => {
//   console.log("A client connected");

//   // When a user connects, store their socket connection using their user ID
//   socket.on("storeUserSocket", (userId) => {
//     userSockets.set(userId.toString(), socket);
//     console.log(`Socket connection stored for user: ${userId}`);
//   });

//   // Example: Handle a custom event from the client
//   socket.on("customEvent", (data) => {
//     console.log("Received custom event:", data);
//     // Handle the received data and emit a response if needed
//   });

//   socket.on("notifRequest", () => {
//     // Get the user ID you're making the request to
//     const providerId = providerIdIo; // Replace "USER_ID" with the actual user ID

//     // Emit the "notification" event to the specific user
//     io.to(providerId.toString()).emit("notification", {
//       message: "Your notification message",
//     });
//   });

//   socket.on("disconnect", () => {
//     // When a user disconnects, remove their socket connection from the data structure
//     const entry = Array.from(userSockets.entries()).find(
//       ([key, value]) => value === socket
//     );
//     if (entry) {
//       const userId = entry[0];
//       userSockets.delete(userId);
//       console.log(`Socket connection removed for user: ${userId}`);
//     }
//     console.log("A client disconnected");
//   });
// });

// module.exports = { io, getUserSockets };

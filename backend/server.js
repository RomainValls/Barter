const app = require("./app");
const http = require("http");
// const socketSetup = require("./socket");
// const socketIO = require("socket.io");
const { io } = require("./routes/request.routes");

const server = http.createServer(app);
io.attach(server); // Call the socket setup function and pass the server object

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const express = require("express");

// WEBSOCKET

// const { createServer } = require("http");

// const { Server } = require("socket.io");

// const app = express();
// const server = createServer(app);
// const io = new Server(server);
// io.attach(server);

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT || 5005;

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;

    console.log(`Connected to Mongo! Database name: "${dbName}"`);

    // const collectionName = "requests"; // Replace with the actual name of your collection

    // const collection = mongoose.connection.collection(collectionName);

    // const changeStream = collection.watch();

    // changeStream.on("change", (change) => {
    //   console.log("Change:", change);
    //   console.log("CONSOLE LOG DU CHANGE STREAM");
    //   // Show notification using react-toastify
    //   io.emit("databaseChange");
    // });
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

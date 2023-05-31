// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
app.use("/api", require("./routes/index.routes"));
app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/wallet", require("./routes/wallet.routes"));
app.use("/skills", require("./routes/skills.routes"));
app.use("/service", require("./routes/service.routes"));
app.use("/request", require("./routes/request.routes"));
app.use("/availability", require("./routes/availability.routes"));
app.use("/category", require("./routes/category.routes"));
app.use("/discussion", require("./routes/discussion.routes"));
app.use("/message", require("./routes/message.routes"));
app.use("/rating", require("./routes/rating.routes"));

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

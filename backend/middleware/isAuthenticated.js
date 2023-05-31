const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

async function isAuthenticated(req, res, next) {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res
        .status(400)
        .json({ message: "No token found" })
        .redirect("/auth/login");
    }
    token = token.replace("Bearer ", "");
    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
    });
    const user = await User.findById(payload._id);
    req.payload = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticated;

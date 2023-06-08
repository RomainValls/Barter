const express = require("express");
const router = express.Router();
const Request = require("../models/Request.model");
const User = require("../models/User.model");
const isAuthenticated = require("../middleware/isAuthenticated");
const { ObjectId } = require("mongoose").Types;
const nodemailer = require("nodemailer");
const SENDMAIL = require("../config/mailer");
const HTML_TEMPLATE = require("../config/mail-template");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allRequest = await Request.find().populate("provider");
    res.json(allRequest);
  } catch (error) {
    next(error);
  }
});

router.get("/me", isAuthenticated, async (req, res, next) => {
  console.log("req payload", req.payload);
  const { _id } = req.payload;

  try {
    const allMyRequests = await Request.find({
      provider: _id,
    }).populate("requester provider");
    res.json(allMyRequests);
  } catch (error) {
    next(error);
  }
});

router.get("/sentRequests", isAuthenticated, async (req, res, next) => {
  console.log("req payload", req.payload);
  const { _id } = req.payload;

  try {
    const allMyRequests = await Request.find({
      requester: _id,
    }).populate("requester provider");
    res.json(allMyRequests);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const oneRequest = await Request.findById(id);
    res.json(oneRequest);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { name, provider, bbAmount, firstMessage, category, acceptButton } =
      req.body;
    const createdRequest = await Request.create({
      name,
      provider,
      requester: req.payload._id,
      bbAmount,
      category,
      firstMessage,
      acceptButton,
    });

    const findProvider = await User.findById(provider); // Assuming you're using Mongoose and the model is named User

    if (!findProvider) {
      // Handle the case when provider is not found
      throw new Error("Provider not found");
    }

    console.log("THIS IS THE PROVIDER IN THE POST", provider);
    // const userEmail = req.payload.email; // Assuming you have the user's email stored in the payload
    // await sendNotificationEmail(userEmail);
    const providerEmail = findProvider.email;

    const message =
      "Hello there, you've been requested ! Visit https://barter-ironhack.netlify.app/ to check it out !";
    const options = {
      from: "Barter <romain.valls95@gmail.com>", // sender address
      to: providerEmail, // receiver email
      subject: "Someone needs you", // Subject line
      text: message,
      html: HTML_TEMPLATE(message),
    };

    // send mail with defined transport object and mail options
    SENDMAIL(options, (info) => {
      console.log("Email sent successfully");
      console.log("MESSAGE ID: ", info.messageId);
    });

    console.log("this is the created Skill", createdRequest);
    console.log("provider email", provider.email);
    res.json(createdRequest);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { name, provider, requester, bbAmount, firstMessage, acceptButton } =
    req.body;
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      {
        name,
        provider,
        requester,
        bbAmount,
        firstMessage,
        acceptButton,
      },
      { new: true }
    );
    res.json(updatedRequest);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedRequest = await Request.findByIdAndDelete(id);
    res.json(deletedRequest);
  } catch (error) {}
});

module.exports = router;

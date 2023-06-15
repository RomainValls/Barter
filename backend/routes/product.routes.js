const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const isAuthenticated = require("../middleware/isAuthenticated");
const { ObjectId } = require("mongoose").Types;
const nodemailer = require("nodemailer");
const SENDMAIL = require("../config/mailer");
const HTML_TEMPLATE = require("../config/mail-template");

router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allProduct = await Product.find().populate("provider requester");
    res.json(allProduct);
  } catch (error) {
    next(error);
  }
});

router.get("/displayed-products", isAuthenticated, async (req, res, next) => {
  console.log("req payload", req.payload);
  const { _id } = req.payload;

  try {
    const allMyProducts = await Product.find({
      provider: _id,
    })
      .populate("provider requester")
      .sort({ createdAt: -1 });

    res.json(allMyProducts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const oneProduct = await Product.findById(id).populate(
      "provider requester"
    );
    res.json(oneProduct);
  } catch (error) {
    next(error);
  }
});

router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { name, description, requester, picture, bbAmount, productCategory } =
      req.body;
    const createdProduct = await Product.create({
      name,
      description,
      provider: req.payload._id,
      picture,
      requester,
      bbAmount,
      productCategory,
    });

    //     const findProvider = await User.findById(provider);

    //     if (!findProvider) {

    //       throw new Error("Provider not found");
    //     }

    //     const providerEmail = findProvider.email;

    //     const message =
    //       "Hello there, you've been requested ! Visit https://barter-ironhack.netlify.app/ to check it out !";
    //     const options = {
    //       from: "Barter <romain.valls95@gmail.com>",
    //       to: providerEmail,
    //       subject: "Someone needs you",
    //       text: message,
    //       html: HTML_TEMPLATE(message),
    //     };

    //     SENDMAIL(options, (info) => {
    //       console.log("Email sent successfully");
    //       console.log("MESSAGE ID: ", info.messageId);
    //     });

    res.json(createdProduct);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    requester,
    reserved,
    bbAmount,
    picture,
    description,
    productCategory,
  } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        picture,
        productCategory,
        requester,
        bbAmount,
        reserved,
      },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (error) {}
});

module.exports = router;

"use strict";
const express = require("express");
const router = express.Router();
const User = require("./users");
const Stripe = require("./stripe");
const Challenge = require("./challenge");

router.get("/", (req, res) => {
  res.send("All routes in here start with API");
});

router.use("/users", User);
router.use("/stripe", Stripe);
router.use("/challenge", Challenge);

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  // err.status = 404;
  next(err);
});

module.exports = router;

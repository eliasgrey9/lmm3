const express = require("express");
const router = express.Router();
const { User, Goal, Participant, Challenge } = require("../db");
require("dotenv").config();

//Creates Challenge and adds challenge creator as participant
router.post("/create-challenge", async (req, res) => {
  try {
    const newChallenge = await Challenge.create({
      title: req.body.title,
      weightToLose: req.body.weightToLose,
      creatorId: req.body.creatorId,
      status: req.body.status,
      units: req.body.units,
      prizeDescription: req.body.prizeDescription,
    });

    await Participant.create({
      userId: req.body.creatorId,
      currentWeight: req.body.currentWeight,
      challengeId: newChallenge.id,
      goalWeight: req.body.currentWeight - req.body.weightToLose,
      shield: false,
      outcome: null,
    });

    res.status(201).json({ message: "Challenge created successfully!" });
  } catch (err) {
    console.error("Error creating challenge:", err);
    res.status(500).json({ error: "Failed to create challenge" });
  }
});

module.exports = router;

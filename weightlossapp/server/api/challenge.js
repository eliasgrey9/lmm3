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

router.get("/find-active-challenges-by-user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const challengesByUser = await Challenge.findAll({
      where: {
        creatorId: userId,
      },
    });

    // Assuming you have a valid challengesByUser data, you can send it in the response
    res.status(200).json({ challengesByUser });
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error("Error finding active challenges by user:", error);
    res
      .status(500)
      .json({ error: "Failed to retrieve active challenges by user" });
  }
});

module.exports = router;

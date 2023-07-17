const express = require("express");
const router = express.Router();
const { Goal } = require("../db");
const bodyParser = require("body-parser");
const stripe = require("stripe")(String(process.env.STRIPE_SECRET_KEY));
const EXTERNAL_CLIENT_APP_URL = process.env.EXTERNAL_CLIENT_APP_URL;
require("dotenv").config();

router.post("/create-checkout-session/25", async (req, res) => {
  const {
    userId,
    weightGoal,
    deadline,
    validatorEmail,
    goalReached,
    giftCardValue,
  } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NTnGqBDrTsQR7OQy5FtvoiU",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${EXTERNAL_CLIENT_APP_URL}/home/${userId}`,
    cancel_url: `${EXTERNAL_CLIENT_APP_URL}/home/${userId}`,
    metadata: {
      userId: userId,
      weightGoal: weightGoal,
      deadline: deadline,
      validatorEmail: validatorEmail,
      goalReached: goalReached,
      giftCardValue: giftCardValue,
    },
  });

  res.send(session.url);
});

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (request, response) => {
    const event = request.body;

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      // Retrieve the session with line items and metadata
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ["line_items"],
        }
      );

      //   const lineItems = sessionWithLineItems.line_items;
      const metadata = sessionWithLineItems.metadata; // Retrieve metadata from the session

      // console.log("metadata", metadata); // Log the metadata

      const userId = parseInt(metadata.userId);
      const weightGoal = parseInt(metadata.weightGoal);
      const deadline = metadata.deadline;
      const validatorEmail = metadata.validatorEmail;
      const giftCardValue = parseInt(metadata.giftCardValue);

      const response = await Goal.create({
        userId: userId,
        weightGoal: weightGoal,
        deadline: deadline,
        validatorEmail: validatorEmail,
        giftCardValue: giftCardValue,
      });
    }

    response.status(200).end();
  }
);

module.exports = router;

import express from "express";
import { db } from "../prisma";
const bodyParser = require("body-parser");
const router = express.Router();
const stripe = require("stripe")(String(process.env.STRIPE_SECRET_KEY));
const EXTERNAL_CLIENT_APP_URL = process.env.EXTERNAL_CLIENT_APP_URL;

router.post("/create-checkout-session/25/:userId", async (req, res) => {
  const { userId } = req.params;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1NT8O1JMCW0ITxtAqEl0Ojzb",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${EXTERNAL_CLIENT_APP_URL}/lasermaps/${userId}`,
    cancel_url: `${EXTERNAL_CLIENT_APP_URL}/lasermaps/${userId}`,
    metadata: {
      userId: userId,
    },
  });

  res.send(session.url);
});

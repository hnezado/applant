const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const configFn = require("../config_server");
let stripe;
const getStripeConfig = async () => {
  const stripeConfig = await configFn.getStripeConfig();
  stripe = require("stripe")(stripeConfig.STRIPE_SECRET_KEY);
};
getStripeConfig();

router.post("/get-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "eur",
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret.toString() });
  } catch (err) {
    const msg = `Error initializing payment`;
    res.status(500).json({ msg, err });
  }
});

router.post("/clear-cart", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    user.cart.splice(0, user.cart.length);
    user.save();
    const msg = `User cart cleared successfully`;
    res.status(200).json({ msg });
  } catch (err) {
    const msg = `Error clearing user cart`;
    res.status(500).json({ msg, err });
  }
});

module.exports = router;

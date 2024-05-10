const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", (req, res) => {
  const { _id, totalPrice } = req.body;
  User.findById(_id)
    .then((user) => {
      const paymentIntent = stripe.paymentIntents
        .create({
          amount: totalPrice * 100,
          currency: "eur",
        })
        .then((result) => {
          res.send({ clientSecret: result.client_secret.toString() });

          User.findByIdAndUpdate(
            _id,
            { cart: [], totalPrice: 0 },
            { new: true }
          ).then((result) => {
            send(result);
          });
        });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;

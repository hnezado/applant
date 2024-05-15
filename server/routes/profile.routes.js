const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Plant = require("../models/Plant.model");

const toUpper = (word) => {
  if (word) return word[0].toUpperCase() + word.slice(1);
};

// ------------ Append plant to favorites --------------- //
router.post("/add-to-favorites/:_id", (req, res) => {
  Plant.findById(req.params._id)
    .then((plant) => {
      if (plant) {
        if (!req.user.favoritePlants.includes(plant._id)) {
          User.findByIdAndUpdate(
            req.user._id,
            {
              $push: { favoritePlants: plant._id },
            },
            { new: true }
          )
            .populate("favoritePlants")
            .then((result) => {
              res.send({
                message: `${toUpper(plant.commonName)} added to favorites`,
                data: result,
              });
            });
        } else {
          res.send({ message: "This plant is already in favorites" });
        }
      } else {
        Plant.create(req.body).then((result) => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { favoritePlants: result._id },
          })
            .populate("favoritePlants")
            .then((result) => {
              res.send({
                message: `${toUpper(
                  result.commonName
                )} created and added to favorites`,
                data: result,
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({ message: "Error adding plant" });
    });
});

// -------------- Remove plant from favorites ------------------ //
router.post("/remove-from-favorites/:_id", (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $pull: { favoritePlants: req.params._id },
  })
    .then((result) => {
      res.send({
        message: `${toUpper(result)} removed from favorites`,
        data: result,
      });
    })
    .catch((err) => {
      res.send(err);
    });
});

// -------------- Put item into cart ------------------ //
router.post("/add-to-cart/:_productId", async (req, res) => {
  try {
    const productId = req.params._productId;
    const { quantity } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      const msg = `User not found`;
      return res.status(400).json({ msg });
    }

    const productIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex !== -1) {
      await User.findOneAndUpdate(
        { _id: userId, "cart.productId": productId },
        { $inc: { "cart.$.quantity": quantity } }
      );
    } else {
      await User.findByIdAndUpdate(userId, {
        $push: { cart: { productId, quantity } },
      });
    }
    const msg = `Product added to cart`;
    res.status(200).json({ msg });
  } catch (err) {
    const msg = `Error adding item to cart`;
    console.error(msg, err);
    return res.status(500).json({ msg, err });
  }
});

// -------------- Remove store item from cart ------------------ //
router.post("/remove-from-cart/:_id", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params._id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { cart: { product: productId } } },
      { new: true }
    ).populate("cart.product");
    if (updatedUser) {
      const msg = `The product has been removed from the shopping cart`;
      res.status(200).json({
        msg,
        user: updatedUser,
      });
    } else {
      const msg = `User not found`;
      console.error(msg);
      res.status(404).json({ msg });
    }
  } catch (err) {
    const msg = `Error removing item from cart`;
    console.error(msg, err);
    res.status(500).json({ msg, err });
  }
});

module.exports = router;

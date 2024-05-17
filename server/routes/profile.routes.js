const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Plant = require("../models/Plant.model");
const Book = require("../models/Book.model");
const Author = require("../models/Author.model");

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
                msg: `${toUpper(plant.commonName)} added to favorites`,
                data: result,
              });
            });
        } else {
          res.send({ msg: "This plant is already in favorites" });
        }
      } else {
        Plant.create(req.body).then((result) => {
          User.findByIdAndUpdate(req.user._id, {
            $push: { favoritePlants: result._id },
          })
            .populate("favoritePlants")
            .then((result) => {
              res.send({
                msg: `${toUpper(
                  result.commonName
                )} created and added to favorites`,
                data: result,
              });
            });
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      res.send({ msg: "Error adding plant" });
    });
});

// -------------- Remove plant from favorites ------------------ //
router.post("/remove-from-favorites/:_id", (req, res) => {
  User.findByIdAndUpdate(req.user._id, {
    $pull: { favoritePlants: req.params._id },
  })
    .then((result) => {
      res.send({
        msg: `${toUpper(result)} removed from favorites`,
        data: result,
      });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

// -------------- Put item into cart ------------------ //
router.post("/add-to-cart/:_productId", async (req, res) => {
  try {
    const productId = req.params._productId.toString();
    const { quantity } = req.body;
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId });
    if (user) {
      const existingProduct = user.cart.find(
        (item) => item?.product?.toString() === productId.toString()
      );
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        user.cart.push({ product: productId, quantity });
      }
      await user.save();
      const msg = `Added item to cart successfully`;
      res.status(200).json({ msg });
    } else {
      const msg = `User not found`;
      return res.status(404).json({ msg });
    }
  } catch (err) {
    const msg = `Error adding item to cart`;
    console.error(msg, err.message);
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
    console.error(msg, err.message);
    res.status(500).json({ msg, err });
  }
});

router.get("/get-user/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id).populate({
      path: "cart.product",
      model: Plant,
    });
    if (!user) {
      const msg = `User not found`;
      return res.status(404).json({ msg });
    }
    console.log("retrieving user:", user);
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error sending user" });
  }
});

router.get("/book/:_id", async (req, res) => {
  Book.findById(req.params._id)
    // .populate("authorId")
    .then((book) => {
      res.status(200).json({ data: book });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ msg: "Error sending book" });
    });
});

module.exports = router;

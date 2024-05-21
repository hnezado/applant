const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

// ------------ Append plant to favorites --------------- //
router.post("/add-to-favorites/:_id", async (req, res) => {
  try {
    const userId = req.user._id;
    const plantId = req.params._id.toString();
    const user = await User.findOne({ _id: userId });
    if (user) {
      const existingFavorite = user.favoritePlants.find(
        (favorite) => favorite?.toString() === plantId.toString()
      );
      if (!existingFavorite) {
        user.favoritePlants.push({ _id: plantId });
      }
      await user.save();
      const msg = `Plant added to favorites successfully`;
      res.status(200).json({ msg });
    } else {
      const msg = `User not found`;
      return res.status(404).json({ msg });
    }
  } catch (err) {
    const msg = `Error adding plant to favorites`;
    console.error(msg, err.message);
    return res.status(500).json({ msg, err });
  }
});

// -------------- Remove plant from favorites ------------------ //
router.post("/remove-from-favorites/:_id", async (req, res) => {
  try {
    const userId = req.user._id;
    const plantId = req.params._id;
    const user = await User.findOne({ _id: userId });
    if (user) {
      const plantIndex = user.favoritePlants.findIndex(
        (favorite) => favorite?.toString() === plantId
      );
      if (plantIndex > -1) {
        user.favoritePlants.splice(plantIndex, 1);
        user.save();
        const msg = `Removed plant from favorites successfully`;
        res.status(200).json({ msg });
      } else {
        const msg = `Plant not found in favorites`;
        return res.status(404).json({ msg });
      }
    } else {
      const msg = `User not found`;
      res.status(404).json({ msg });
    }
  } catch (err) {
    const msg = `Error removing plant from favorites`;
    console.error(msg, err.message);
    return res.status(500).json({ msg, err });
  }
});

// -------------- Put item into cart ------------------ //
router.post("/add-to-cart/:_productId", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params._productId.toString();
    const { quantity } = req.body;
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

router.post("/edit-quantity/:_id", async (req, res) => {
  try {
    const userId = req.user?._id;
    const productId = req.params?._id?.toString();
    const { quantity } = req.body;
    const user = await User.findOne({ _id: userId });

    const productIndex = await user.cart.findIndex(
      (item) => item?.product?.toString() === productId
    );
    if (productIndex > -1) {
      user.cart[productIndex].quantity = quantity;
      if (user.cart[productIndex].quantity <= 0) {
        user.cart.splice(productIndex, 1);
        user.save();
        const msg = `Removed item from cart successfully`;
        res.status(200).json({ msg });
      } else {
        user.save();
        const msg = `Edited product quantity successfully`;
        res.status(200).json({ msg });
      }
    } else {
      const msg = `Product not found in cart`;
      return res.status(404).json({ msg });
    }
  } catch (err) {
    const msg = `Error editing item quantity`;
    console.error(msg, err.message);
    return res.status(500).json({ msg, err });
  }
});

// -------------- Remove store item from cart ------------------ //
router.post("/remove-from-cart/:_id", async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params._id;
    const user = await User.findOne({ _id: userId });
    if (user) {
      const productIndex = user.cart.findIndex(
        (item) => item?.product?.toString() === productId
      );
      if (productIndex > -1) {
        user.cart.splice(productIndex, 1);
        user.save();
        const msg = `Removed item from cart successfully`;
        res.status(200).json({ msg });
      } else {
        const msg = `Product not found in cart`;
        return res.status(404).json({ msg });
      }
    } else {
      const msg = `User not found`;
      res.status(404).json({ msg });
    }
  } catch (err) {
    const msg = `Error removing item from cart`;
    console.error(msg, err.message);
    res.status(500).json({ msg, err });
  }
});

module.exports = router;

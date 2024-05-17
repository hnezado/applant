const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/User.model");
const Plant = require("../models/Plant.model");

// ---------- Sign up ---------- //
router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.send({ msg: "You must fill all the fields" });
  } else if (password.length < 6) {
    res.send({ msg: "The password must be at least 6 digits long" });
  } else {
    User.findOne({ username })
      .then((user) => {
        if (user) {
          res.send({
            msg: `User ${user.username} already exists`,
            alreadyExists: true,
          });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);
          User.create({ username, password: hashedPassword }).then((result) => {
            res.send({
              msg: `User ${result.username} created successfully`,
              data: result,
              successSignup: true,
            });
          });
        }
      })
      .catch((err) => {
        res.send({ msg: `Error: ${err}` });
      });
  }
});

// ---------- Log in ---------- //
router.post("/login", (req, res) => {
  passport.authenticate("local", (err, user, failureDetails) => {
    if (err) {
      console.log(err);
      res.send({ msg: "Error with Passport Authentication" });
      return;
    }
    if (!user) {
      res.send({ msg: "Incorrect username or password", failureDetails });
      return;
    }
    res.cookie("sameSite", "none", {
      sameSite: true,
      secure: true,
    });
    req.login(user, (err) => {
      if (err) {
        console.log(err);
        res.send({ msg: "Error logging in" });
      } else {
        User.findById(user._id)
          .populate("favoritePlants")
          .populate("cart.plant")
          .then((result) => {
            res.send({
              msg: "Logged in successfully",
              data: result,
              successLogin: true,
            });
          })
          .catch(() => {
            res.send({ msg: "Error finding the user" });
          });
      }
    });
  })(req, res);
});

//---- Check if the user is logged => req.user is from Passport ---- //
router.get("/user", async (req, res) => {
  if (req.user) {
    User.findById(req.user._id)
      .populate("favoritePlants")
      .populate({
        path: "cart.product",
        model: Plant,
      })
      .then((user) => {
        // console.log("retrieving user:", user);
        // console.log("cart after populate:", user.cart[0]);
        res.status(200).json({ data: user });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ msg: "Error sending user" });
      });
  } else {
    res.json({ msg: "Not authenticated" });
  }
});

// ------ Logout ----------- //
router.post("/logout", (req, res) => {
  req.logout();
  res.send({ msg: "Logged out successfully" });
});

module.exports = router;

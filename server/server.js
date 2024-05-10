require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const chalk = require("chalk");
const flash = require("connect-flash");
const cors = require("cors");
const path = require("path");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User.model");

// ---------- Mongoose ---------- //
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

// ---------- Express ---------- //
const server = express();

// ---------- Middleware setup ---------- //
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, "public")));

// -------- CORS --------
server.use(
  cors({
    methods: ["GET", "POST"],
    credentials: true,
    origin: "http://localhost:3000",
  })
);

// -------- PASSPORT --------
server.use(
  session({
    secret: "cAdeNA%aleaTorIa",
    resave: true,
    saveUninitialized: true,
  })
);
passport.serializeUser((user, callback) => {
  callback(null, user._id);
});
passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then((result) => {
      callback(null, result);
    })
    .catch((err) => {
      callback(err);
    });
});
server.use(flash());
passport.use(
  new LocalStrategy(
    {
      usernameField: `username`,
      passwordField: `password`,
      passReqToCallback: true,
    },
    (req, username, password, next) => {
      User.findOne({ username })
        .then((user) => {
          if (!user) {
            return next(null, false, {
              message: `Incorrect username or password`,
            });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, {
              message: `Incorrect username or password`,
            });
          }
          return next(null, user);
        })
        .catch((err) => {
          next(err);
        });
    }
  )
);
server.use(passport.initialize());
server.use(passport.session());

// ---------- ROUTES ---------- //
server.use("/server", require("./routes/index.routes"));
server.use("/server", require("./routes/auth.routes"));
server.use("/server", require("./routes/allPlants.routes"));
server.use("/server", require("./routes/posts.routes"));
server.use("/server", require("./routes/profile.routes"));
server.use("/server", require("./routes/stripe.routes"));

// ---------- LISTENER ---------- //
server.listen(5000, () => {
  console.log(chalk.green.inverse("Backend listening on port 5000"));
});

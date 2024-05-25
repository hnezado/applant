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
const fs = require("fs");
const https = require("https");
const configFn = require("./config_server_dev");

// ---------- Mongoose ---------- //
const mongoose = require("mongoose");

const app = express();
let config;

// ---------- Middleware setup ---------- //
const setUpMiddleware = () => {
  app.use(cors(config.cors));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(flash());
  app.use(express.static(path.join(__dirname, "public")));

  app.use(
    session({
      secret: config.session.SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );

  initPassport();
  initDb();
};

const initDb = () => {
  mongoose
    .connect(
      `mongodb+srv://${config.db.auth.DB_USER}:${config.db.auth.DB_PASS}@${config.db.HOST}/${config.db.auth.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then((res) => {
      console.log(
        `Connected to Mongo! Database name: "${res.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err);
    });
};

const initPassport = () => {
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
                msg: `Incorrect username or password`,
              });
            }
            if (!bcrypt.compareSync(password, user.password)) {
              return next(null, false, {
                msg: `Incorrect username or password`,
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
  app.use(passport.initialize());
  app.use(passport.session());
};

const setUpRoutes = () => {
  app.use("/server", require("./routes/index.routes"));
  app.use("/server", require("./routes/auth.routes"));
  app.use("/server", require("./routes/allPlants.routes"));
  app.use("/server", require("./routes/posts.routes"));
  app.use("/server", require("./routes/profile.routes"));
  app.use("/server", require("./routes/stripe.routes"));
};

const getHttpsOptions = () => {
  return {
    cert: fs.readFileSync(config.httpsServer.CERT_PATH),
    key: fs.readFileSync(config.httpsServer.PRIV_KEY),
  };
};

const initialize = async () => {
  try {
    config = await configFn.getConfig();
    setUpMiddleware();
    setUpRoutes();

    const server = https.createServer(getHttpsOptions(), app);

    server.listen(config.port, () => {
      console.log(chalk.green.inverse(`Listening on port: ${config.port}`));
    });
  } catch (err) {
    console.error(`Error loading server configuration`, err);
  }
};

initialize();

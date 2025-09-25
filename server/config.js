require("dotenv").config();

const getConfig = () => {
  return {
    PORT: process.env.PORT,
    db: {
      HOST: process.env.DB_HOST,
      NAME: process.env.DB_NAME,
      auth: {
        USER: process.env.DB_USER,
        PASS: process.env.DB_PASS,
      },
    },
    session: {
      SECRET: process.env.SESSION_SECRET,
    },
    cors: {
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
    httpsServer: {
      CERT_PATH: process.env.HTTPS_CERTIFICATE,
      PRIV_KEY: process.env.HTTPS_PRIVATE_KEY,
    },
  };
};

const getStripeConfig = async () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return { STRIPE_SECRET_KEY: secretKey };
};

module.exports = {
  getConfig,
  getStripeConfig,
};

const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-3" });
// AWS.config.credentials = new AWS.SharedIniFileCredentials({
//   profile: "default",
// });
const ssm = new AWS.SSM();

const getParam = async (param) => {
  try {
    const data = await ssm
      .getParameter({ Name: param, WithDecryption: true })
      .promise();
    const parameterValue = data.Parameter.Value;
    return parameterValue;
  } catch (err) {
    console.error("Error obtaining parameter value", err);
    throw err;
  }
};

const getConfig = async () => {
  return {
    port: 3102,
    db: {
      HOST: "cluster0.tpwjp.mongodb.net",
      auth: {
        DB_USER: await getParam("APPLANT_DB_USER"),
        DB_PASS: await getParam("APPLANT_DB_PASS"),
        DB_NAME: await getParam("APPLANT_DB_NAME"),
      },
    },
    session: {
      SECRET: await getParam("APPLANT_SESSION_SECRET"),
    },
    cors: {
      origin: "https://applant.hnezado.com",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
    httpsServer: {
      CERT_PATH: "/etc/letsencrypt/live/hnezado.com/fullchain.pem",
      PRIV_KEY: "/etc/letsencrypt/live/hnezado.com/privkey.pem",
    },
  };
};

const getStripeConfig = async () => {
  console.log("Getting getStripeConfig!");
  const secretKey = await getParam("STRIPE_SECRET_KEY");
  console.log("secretKey:", secretKey);
  return { STRIPE_SECRET_KEY: secretKey };
};

module.exports = {
  getConfig,
  getStripeConfig,
};

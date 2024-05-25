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
      origin: "http://localhost:3000",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials: true,
      optionsSuccessStatus: 204,
    },
    httpsServer: {
      CERT_PATH: "C:/Users/Jekthor/Documents/https/hnezado.com/fullchain1.pem",
      PRIV_KEY: "C:/Users/Jekthor/Documents/https/hnezado.com/privkey1.pem",
    },
  };
};

module.exports = {
  getConfig,
};

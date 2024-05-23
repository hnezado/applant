const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-3" });
const ssm = new AWS.SSM();

async function getParam(param) {
  try {
    const data = await ssm
      .getParameter({ Name: param, WithDecryption: false })
      .promise();
    const parameterValue = data.Parameter.Value;
    return parameterValue;
  } catch (err) {
    console.error("Error obtaining parameter value", err);
    throw err;
  }
}

async function getConfig() {
  return {
    port: 3002,
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
    httpsServer: {
      CERT_PATH: await getParam("PORTFOLIO_CERTIFICATE_PATH"),
      PRIV_KEY: await getParam("PORTFOLIO_PRIVATE_KEY"),
    },
  };
}

module.exports = {
  getConfig,
};

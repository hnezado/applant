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
    DB_SERVER_URL: await getParam("APPLANT_SERVER_URL"),
    DB_SERVER_URL_DEV: "https://localhost:3002/server",
  };
}

module.exports = {
  getConfig,
};

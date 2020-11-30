const { table, getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  try {
    const formattedRecords = await getHighScores(true);
    console.log(`formatted records is ${JSON.stringify(formattedRecords)}`);
    return {
      statusCode: 200,
      body: JSON.stringify(formattedRecords),
    };
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ err: "Failed to query records in Airtable" }),
    };
  }
};

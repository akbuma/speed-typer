const { table, getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        err: "That method is not allowed",
      }),
    };
  }

  // const body = JSON.parse(event.body);
  const { Score, name } = JSON.parse(event.body);
  if (typeof Score === "undefined" || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad request" }),
    };
  }

  try {
    const formattedRecords = await getHighScores(false);
    const lowestRecord = formattedRecords[9];

    if (
      typeof lowestRecord.fields.Score === "undefined" ||
      Score > lowestRecord.fields.Score
    ) {
      // update the record with the incoming score
      const updatedRecord = {
        id: lowestRecord.id,
        fields: { name, Score },
      };
      console.log(`updated this mfer ${updatedRecord}`);
      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    return {
      statusCode: 200,
      body: JSON.stringify({ err: "Failed to save score to Airtable lol" }),
    };
  }
};

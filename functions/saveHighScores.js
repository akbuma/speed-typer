const { table, getHighScores } = require("./utils/airtable");
const {
  getAccessTokenFromHeaders,
  validateAccessToken,
} = require("./utils/auth");

exports.handler = async (event) => {
  //console.log(event.headers);

  const token = getAccessTokenFromHeaders(event.headers);
  const user = await validateAccessToken(token);

  // prevent outside users from trying to submit their own high score
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ err: "User is not logged in" }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        err: "That method is not allowed",
      }),
    };
  }

  // const body = JSON.parse(event.body);
  const { Score } = JSON.parse(event.body);
  const name = user["https://speedtyper/username"];

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

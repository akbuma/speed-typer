require("dotenv").config();
const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_API_BASE);
const table = base(process.env.AIRTABLE_TABLE);

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
  if (!Score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad request" }),
    };
  }

  try {
    const records = await table
      .select({
        sort: [{ field: "Score", direction: "desc" }],
      })
      .firstPage();
    const formattedRecords = records.map((record) => ({
      id: record.id,
      fields: record.fields,
    }));

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

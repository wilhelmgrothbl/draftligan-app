const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY,
});

exports.handler = async (event, context) => {
  try {
    const teams = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_teams"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );
    return {
      statusCode: 200,
      body: JSON.stringify(teams.data.map((team) => team.data)),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch all teams from database",
        details: error.message,
      }),
    };
  }
};

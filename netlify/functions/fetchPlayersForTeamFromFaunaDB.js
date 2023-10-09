const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY,
});

exports.handler = async (event, context) => {
  const { teamName } = JSON.parse(event.body);
  try {
    const team = await client.query(
      q.Get(q.Match(q.Index("teams_by_name"), teamName))
    );
    const playerIds = team.data.playerIds;
    const players = await client.query(
      q.Map(
        playerIds,
        q.Lambda(
          "playerId",
          q.Get(q.Ref(q.Collection("Players"), q.Var("playerId")))
        )
      )
    );
    return {
      statusCode: 200,
      body: JSON.stringify(players.map((player) => ({
        id: player.ref.id,
        ...player.data
      }))),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch players for team from database",
        details: error.message,
      }),
    };
  }
};

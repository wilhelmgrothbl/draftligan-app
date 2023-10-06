const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY,
});

exports.handler = async (event, context) => {
  const { teamName, playerId } = JSON.parse(event.body);
  try {
    const team = await client.query(
      q.Get(q.Match(q.Index("teams_by_name"), teamName))
    );
    if (!team.data.playerIds.includes(playerId)) {
      throw new Error("Player is not in the team");
    }
    const updatedPlayerIds = team.data.playerIds.filter((id) => id !== playerId);
    const updatedTeam = await client.query(
      q.Update(team.ref, {
        data: {
          playerIds: updatedPlayerIds,
        },
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify(updatedTeam.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to remove player from team in database",
        details: error.message,
      }),
    };
  }
};

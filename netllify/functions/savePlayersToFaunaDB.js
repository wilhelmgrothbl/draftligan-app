const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY,
});
const fetch = require("node-fetch");

async function fetchFPLPlayers() {
  const response = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
  const data = await response.json();
  return data.elements.map((player) => ({
    first_name: player.first_name,
    second_name: player.second_name,
    total_points: player.total_points,
    event_points: player.event_points,
  }));
}

exports.handler = async (event, context) => {
  try {
    const players = await fetchFPLPlayers();
    const savedPlayers = [];
    for (let player of players) {
      const result = await client.query(
        q.Create(q.Collection("Players"), {
          data: {
            first_name: player.first_name,
            second_name: player.second_name,
            total_points: player.total_points,
            event_points: player.event_points,
          },
        })
      );
      savedPlayers.push(result);
    }
    return {
      statusCode: 200,
      body: JSON.stringify(savedPlayers),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to save players to database",
        details: error.message,
      }),
    };
  }
};

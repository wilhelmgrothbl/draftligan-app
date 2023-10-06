const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    const response = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
    const data = await response.json();

    const players = data.elements.map((player) => ({
      first_name: player.first_name,
      second_name: player.second_name,
      total_points: player.total_points,
      event_points: player.event_points,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(players),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch players from database",
        details: error.message,
      }),
    };
  }
};

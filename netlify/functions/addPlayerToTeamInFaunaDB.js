// För addPlayerToTeamInFaunaDB.js
exports.handler = async (event, context) => {
    const { teamName, playerId } = JSON.parse(event.body);
    try {
      const updatedTeam = await addPlayerToTeamInFaunaDB(teamName, playerId);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedTeam),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to add player to team in database",
          details: error.message,
        }),
      };
    }
  };
  
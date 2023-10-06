import React, { useState, useEffect } from "react";
import axios from "axios";

const EditTeamPage = () => {
  const [teams, setTeams] = useState([]);
  const [allPlayers, setAllPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState({});
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';


  const fetchTeamsWithPlayers = () => {
    axios
      .get("http://localhost:5000/api/teams")
      .then(async (response) => {
        const teamsWithPlayers = await Promise.all(
          response.data.map(async (team) => {
            const playersResponse = await axios.get(
              `http://localhost:5000/api/teams/players/${team.teamName}`
            );
            return { ...team, players: playersResponse.data };
          })
        );
        setTeams(teamsWithPlayers);
      })
      .catch((error) => {
        console.error("Error fetching teams:", error);
      });
  };
  
  useEffect(() => {
    fetchTeamsWithPlayers();
  }, []);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/players")
      .then((response) => {
        setAllPlayers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  }, []);



  const handlePlayerSelection = (teamName, event) => {
    setSelectedPlayers({
      ...selectedPlayers,
      [teamName]: event.target.value,
    });
  };

  const handleAddPlayerToTeam = (teamName) => {
    const playerToAdd = allPlayers.find(
      (player) =>
        `${player.first_name}-${player.second_name}` ===
        selectedPlayers[teamName]
    );

    if (!playerToAdd) return;
    axios
      .post("http://localhost:5000/api/teams/addPlayer", {
        teamName: teamName,
        playerId: playerToAdd.id, // Använd id istället för ref
      })
      .then((response) => {
        fetchTeamsWithPlayers(); 
      })
      .catch((error) => {
        console.error("Error adding player:", error);
      });
  };

  const handleRemovePlayerFromTeam = (teamName, playerId) => {
    axios
      .post("http://localhost:5000/api/teams/removePlayer", {
        teamName: teamName,
        playerId: playerId,
      })
      .then((response) => {
        fetchTeamsWithPlayers();
      })
      .catch((error) => {
        console.error("Error removing player:", error);
      });
  };


return (
    <div>
      <h1>Edit Teams</h1>
      <ul>
        {teams.map((team, teamIndex) => (
          <li key={team.teamName}>
            {team.teamName}
            <div>
              <label>Add Player to {team.teamName}: </label>
              <select
                value={selectedPlayers[team.teamName] || ""}
                onChange={(e) => handlePlayerSelection(team.teamName, e)}
                className="bg-white px-3 py-2 border rounded"
              >
                <option value="" disabled>
                  Select a player
                </option>
                {allPlayers.map((player) => (
                  <option
                    key={`${player.first_name}-${player.second_name}`}
                    value={`${player.first_name}-${player.second_name}`}
                  >
                    {player.first_name} {player.second_name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleAddPlayerToTeam(team.teamName)}
                className="ml-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Lägg till
              </button>
            </div>
  
            <ul>
              {team.players
                ? team.players.map((player, playerIndex) => (
                    <li key={`${player.first_name}-${player.second_name}`}>
                      {player.first_name} {player.second_name} -{" "}
                      {player.total_points} points
                      <button
                      
                        onClick={() =>
                            
                          handleRemovePlayerFromTeam(team.teamName, player.id)
                        }
                        className="ml-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Ta bort
                      </button>
                    </li>
                  ))
                : null}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default EditTeamPage;

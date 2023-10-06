const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const faunadb = require("faunadb");
const q = faunadb.query;
const fetch = require("node-fetch");
const app = express();
const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET_KEY,
  });
  

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Example route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/api/fpl/players", async (req, res) => {
  try {
    const response = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const data = await response.json();
    const players = data.elements.map((player) => ({
      first_name: player.first_name,
      second_name: player.second_name,
      total_points: player.total_points,
      event_points: player.event_points,
    }));
    res.json(players);
  } catch (error) {
    console.error(error); // Logga felet för att se detaljer i din server logg
    res
      .status(500)
      .json({
        error: "Failed to fetch players from database",
        details: error.message,
      });
  }
});

app.get("/api/fpl/savePlayers", async (req, res) => {
  try {
    const response = await fetch(
      "https://fantasy.premierleague.com/api/bootstrap-static/"
    );
    const data = await response.json();

    const players = data.elements;
    const savedPlayers = [];

    for (let player of players) {
      const result = await client.query(
        q.Create(q.Collection("Players"), {
          data: {
            first_name: player.first_name,
            second_name: player.second_name,
            position: player.position,
            total_points: player.total_points,
            event_points: player.event_points,
          },
        })
      );

      savedPlayers.push(result);
    }

    res.json(savedPlayers);
  } catch (error) {
    res.status(500).json({ error: "Failed to save players to database" });
  }
});

app.get("/api/players", async (req, res) => {
  try {
    const players = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_players"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );
    res.json(
      players.data.map((player) => ({
        id: player.ref.id,
        ...player.data,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch players from database" });
  }
});

app.get("/api/teams", async (req, res) => {
  try {
    const teams = await client.query(
      q.Map(
        q.Paginate(q.Match(q.Index("all_teams"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    );
    res.json(teams.data.map((team) => team.data));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams from database" });
  }
});

app.post("/api/teams/addPlayer", async (req, res) => {
  const { teamName, playerId } = req.body;
  let team;
  try {
    team = await client.query(
      q.Get(q.Match(q.Index("teams_by_name"), teamName))
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch team", details: error });
  }

  try {
    const updatedTeam = await client.query(
      q.Update(team.ref, {
        data: {
          playerIds: [...team.data.playerIds, playerId],
        },
      })
    );
    res.json(updatedTeam.data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update team", details: error.message });
  }
});

// backend/server.js eller motsvarande fil

app.get("/api/teams/players/:teamName", async (req, res) => {
    const teamName = req.params.teamName;
  
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
  
      const playerData = players.map((player) => ({
        id: player.ref.id,
        ...player.data
      }));
      res.json(playerData);
    } catch (error) {
      res
        .status(500)
        .json({
          error: "Failed to fetch players for the team",
          details: error.message,
        });
    }
  });
  

app.post("/api/teams/removePlayer", async (req, res) => {
  const { teamName, playerId } = req.body;
  let team;
  try {
    team = await client.query(
      q.Get(q.Match(q.Index("teams_by_name"), teamName))
    );
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch team", details: error });
  }

  if (!team.data.playerIds.includes(playerId)) {
    return res.status(400).json({ error: "Player is not in the team" });
  }

  const updatedPlayerIds = team.data.playerIds.filter((id) => id !== playerId);

  try {
    const updatedTeam = await client.query(
      q.Update(team.ref, {
        data: {
          playerIds: updatedPlayerIds,
        },
      })
    );
    res.json(updatedTeam.data);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to update team", details: error.message });
  }
});

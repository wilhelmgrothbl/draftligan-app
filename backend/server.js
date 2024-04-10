require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const app = express();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Filväg till din teams.json
const filePath = path.join(__dirname, 'teams.json');

// Testroute för att verifiera att backend fungerar
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Hämta alla spelare från FPL API
app.get("/api/fpl/players", async (req, res) => {
  try {
    const response = await fetch("https://fantasy.premierleague.com/api/bootstrap-static/");
    const data = await response.json();
    const players = data.elements.map((player) => ({
      id: player.id,
      name: `${player.first_name} ${player.second_name}`,
      elementType: player.element_type, 
      totalPoints: player.total_points, 
    }));
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch players from FPL API", details: error.message });
  }
});


// Hämta lag från teams.json
app.get("/api/teams", (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.post("/api/teams/update", (req, res) => {
  const updatedTeam = req.body;
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the file', err);
      res.status(500).json({ message: 'Error reading the file', error: err });
      return;
    }
    
    let teamsData;
    try {
      teamsData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing the file', parseErr);
      res.status(500).json({ message: 'Error parsing the file', error: parseErr });
      return;
    }

    const teamIndex = teamsData.managers.findIndex(team => team.teamName === updatedTeam.teamName);
    
    if (teamIndex === -1) {
      res.status(404).json({ message: 'Team not found' });
      return;
    }
    
    teamsData.managers[teamIndex] = updatedTeam;

    fs.writeFile(filePath, JSON.stringify(teamsData, null, 2), 'utf8', writeErr => {
      if (writeErr) {
        console.error('Error writing to the file', writeErr);
        res.status(500).json({ message: 'Error writing to the file', error: writeErr });
        return;
      }

      res.json({ message: 'Team updated successfully', updatedTeam });
    });
  });
});

// Portkonfiguration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

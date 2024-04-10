import React, { useState, useEffect } from 'react';

const EditTeamPage = () => {
  const [players, setPlayers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [startingEleven, setStartingEleven] = useState(Array(11).fill(''));
  const [subs, setSubs] = useState(Array(4).fill(''));
  const [selectedTeam, setSelectedTeam] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Funktion för att hämta spelare och managers
    const fetchData = async () => {
      try {
        const playersUrl = 'http://localhost:5000/api/fpl/players';
        const teamsUrl = 'http://localhost:5000/api/teams';
        const playersResponse = await fetch(playersUrl);
        const teamsResponse = await fetch(teamsUrl);
        const playersData = await playersResponse.json();
        const teamsData = await teamsResponse.json();

        setPlayers(playersData.map(player => ({
          id: player.id,
          name: `${player.first_name} ${player.second_name}`,
          elementType: player.element_type,
          totalPoints: player.total_points,
        })));
        console.log(playersData); // Lägg till denna logg
  
        setManagers(teamsData.managers);
        console.log(teamsData.managers); // Lägg till denna logg
        

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const team = managers.find(team => team.teamName === selectedTeam);
    if (team) {
      const numericStarters = team.squad.starters.map(id => Number(id));
      console.log('Manager Starters IDs:', numericStarters);
      const numericSubs = team.squad.subs.map(id => Number(id));
      console.log('Manager Subs IDs:', numericSubs);
  
      const validStarters = numericStarters.every(id => players.some(player => player.id === id));
      console.log('Are all starters valid?', validStarters);
      const validSubs = numericSubs.every(id => players.some(player => player.id === id));
      console.log('Are all subs valid?', validSubs);
  
      setStartingEleven(numericStarters);
      setSubs(numericSubs);
    }
  }, [selectedTeam, managers, players]); // Lägg till 'players' här för att se till att effekten körs när 'players' uppdateras.
  
  
  
  const handlePlayerSelect = (playerId, index, isSub) => {
    console.log(`Väljer spelare ${playerId} för position ${index}, isSub: ${isSub}`);
    if (isSub) {
      const newSubs = [...subs];
      newSubs[index] = playerId;
      console.log(`Nya avbytare: ${newSubs}`);
      setSubs(newSubs);
    } else {
      const newStartingEleven = [...startingEleven];
      newStartingEleven[index] = playerId;
      console.log(`Ny startelva: ${newStartingEleven}`);
      setStartingEleven(newStartingEleven);
    }
  };
  
  
  

  const handleSubmit = async () => {
    const teamToUpdate = managers.find((manager) => manager.teamName === selectedTeam);
    if (teamToUpdate) {
      // Skapa ett objekt som representerar det uppdaterade laget
      const updatedTeamData = {
        ...teamToUpdate,
        squad: {
          starters: startingEleven,
          subs: subs,
        },
      };
  
      // Gör ett POST-anrop till backend för att spara den nya laguppställningen
      try {
        const response = await fetch('http://localhost:5000/api/teams/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTeamData),
        });
        if (response.ok) {
          const responseBody = await response.json();
          console.log('Laguppställningen har sparats!', responseBody);
          // Här kan du hantera vad som händer efter att datan har sparats,
          // t.ex. visa ett meddelande eller navigera användaren.
        } else {
          console.error('Ett fel inträffade när laguppställningen skulle sparas.');
        }
      } catch (error) {
        console.error('Ett nätverksfel inträffade:', error);
      }
    }
  };
  const getPlayerDetailsById = (playerId) => {
    if (!playerId) return "Spelare ej vald";
    
    const numericPlayerId = Number(playerId);
    console.log('Players array:', players);
    
    const player = players.find((p) => p.id === numericPlayerId);
    
    console.log(`Player found for ID ${numericPlayerId}:`, player);
    
    if (player) {
      return `${player.name ?? 'Namn ej tillgängligt'} - Position: ${player.elementType ?? 'Ej tillgänglig'} - Poäng för rundan: ${player.totalPoints ?? 'Ej tillgänglig'}`;
    } else {
      return "Spelare ej vald";
    }
  };
  
  
  
  
  
  
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Laguppställning</h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader">Laddar...</div>
        </div>
      ) : error ? (
        <p className="text-red-500">Ett fel inträffade: {error}</p>
      ) : (
        <>
          <div>
            <label htmlFor="team-selector" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Välj ett lag:</label>
            <select
              id="team-selector"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="mb-4 p-2 rounded border border-gray-300"
            >
              <option value="">Välj ett lag</option>
              {managers.map((manager) => (
                <option key={manager.teamName} value={manager.teamName}>
                  {manager.name} - {manager.teamName}
                </option>
              ))}
            </select>
          </div>
  
          {/* Startspelare dropdowns */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <h3 className="col-span-3 text-xl font-semibold mb-2">Startspelare:</h3>
            {startingEleven.map((playerId, index) => (
              <div key={`starter-${index}`} className="col-span-1">
                <label htmlFor={`starter-${index}`} className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Spelare {index + 1}</label>
                <select
                  id={`starter-${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  value={playerId}
                  onChange={(e) => handlePlayerSelect(Number(e.target.value), index, false)}

                >
                  <option value="">Välj en spelare</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
  
          {/* Avbytare dropdowns */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            <h3 className="col-span-4 text-xl font-semibold mb-2">Avbytare:</h3>
            {subs.map((playerId, index) => (
              <div key={`sub-${index}`} className="col-span-1">
                <label htmlFor={`sub-${index}`} className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-300">Avbytare {index + 1}</label>
                <select
                  id={`sub-${index}`}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  value={playerId}
                  onChange={(e) => handlePlayerSelect(Number(e.target.value), index, true)}
                >
                  <option value="">Välj en spelare</option>
                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
  
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={!selectedTeam || startingEleven.includes('') || subs.includes('')}
          >
            Spara Startelva
          </button>
        </>
      )} 
       <div>
      <h3 className="text-xl font-semibold mb-2">Startelva:</h3>
      <ul>
      {startingEleven.filter(playerId => playerId).map((playerId, index) => {
  // Use both playerId and index to ensure the key is unique
  const playerDetails = getPlayerDetailsById(playerId);
  return <li key={`starter-${playerId}-${index}`}>{playerDetails}</li>;
})}

</ul>
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">Avbytare:</h3>
      <ul>
  {subs.filter(playerId => playerId).map((playerId, index) => {
    const playerDetails = getPlayerDetailsById(playerId);
    return <li key={`sub-${playerId}-${index}`}>{playerDetails}</li>;
  })}
</ul>
    </div>

  </div>

  );
  
  
  
};

export default EditTeamPage;
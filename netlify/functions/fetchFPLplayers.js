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

async function fetchPlayersFromFaunaDB() {
    const players = await client.query(
        q.Map(
            q.Paginate(q.Match(q.Index("all_players"))),
            q.Lambda("X", q.Get(q.Var("X")))
        )
    );
    return players.data.map((player) => ({
        id: player.ref.id,
        ...player.data,
    }));
}

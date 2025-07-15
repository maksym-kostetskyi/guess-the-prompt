export default async function kickPlayer (
  player_name: string,
  roomId: string
) {
  const response = await fetch(
    `https://guessthepromt.store/rooms/${roomId}/kick_player`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: player_name,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to kick player");
  }

  const data = await response.json();
  return data;
}
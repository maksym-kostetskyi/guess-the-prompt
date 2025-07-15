export default async function startGame(
  roomId: string
) {
  const response = await fetch(
    `https://guessthepromt.store/rooms/${roomId}/start_game`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to start game");
  }

  const data = await response.json();
  return data;
}
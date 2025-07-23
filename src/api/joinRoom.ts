export async function joinRoom(
  roomId: string,
  playerName: string
): Promise<void> {
  const res = await fetch(`https://guessthepromt.store/rooms/${roomId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player_name: playerName }),
  });
  if (!res.ok) throw new Error(`Join room failed: ${res.status}`);
}

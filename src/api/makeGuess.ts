export async function makeGuess(roomId: string, playerName: string, guess: string): Promise<Response> {
  return fetch(`https://guessthepromt.store/rooms/${roomId}/guess`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player_name: playerName, guess }),
  });
}

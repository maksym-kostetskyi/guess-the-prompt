// src/api/leaveRoom.ts

export async function leaveRoom(roomId: string, playerName: string): Promise<Response> {
  return fetch(`https://guessthepromt.store/rooms/${roomId}/leave`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player_name: playerName }),
  });
}

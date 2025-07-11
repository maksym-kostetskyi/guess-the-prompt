export default async function nextTurn(roomId: string) {
  try {
    const response = await fetch(
      `https://guessthepromt.store/api/rooms/${roomId}/next`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Next Turn Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to start next turn:", error);
    throw error;
  }
}

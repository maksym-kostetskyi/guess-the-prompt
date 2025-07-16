export async function restartGame(roomId: string) {
  try {
    const response = await fetch(
      `https://guessthepromt.store/rooms/${roomId}/restart_game`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to restart the game");
    }

    return await response.json();
  } catch (error) {
    console.error("Error restarting game:", error);
    throw error;
  }
}

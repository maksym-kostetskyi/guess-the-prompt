export default async function generateImage(
  playerName: string,
  prompt: string,
  roomId: string
) {
  const response = await fetch(
    `https://guessthepromt.store/rooms/${roomId}/prompt`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player_name: playerName,
        prompt: prompt,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate image");
  }

  const data = await response.json();
  return data.image_url;
}

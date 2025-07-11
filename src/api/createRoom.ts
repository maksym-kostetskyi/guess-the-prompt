export async function createRoom(): Promise<string> {
  const res = await fetch(`https://guessthepromt.store/rooms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to create room");
  }

  const data = await res.json();
  return data.room_id;
}

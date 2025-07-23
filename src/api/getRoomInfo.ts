import type Room from "@/types/Room";

export async function getRoomInfo(roomId: string): Promise<Room> {
  const res = await fetch(`https://guessthepromt.store/rooms/${roomId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Fetch room failed: ${res.status}`);
  return res.json();
}

import type Settings from "@/types/Settings";

export default async function changeSettings(
  roomId: string,
  settings: Settings
) {
  const response = await fetch(
    `https://guessthepromt.store/rooms/${roomId}/change_settings`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to change settings");
  }

  const data = await response.json();
  return data;
}

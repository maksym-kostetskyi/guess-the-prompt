import type Player from "@/types/Player";

export async function getPlayerInfo(): Promise<Player> {
  const storedPlayer = localStorage.getItem("player");
  const playerObj = storedPlayer
    ? JSON.parse(storedPlayer)
    : { name: "Guest", token: null };
  const name = playerObj.name;

  console.log("Stored player name:", name);

  const res = await fetch(
    `https://guessthepromt.store/api/v1/accounts/stats/${name} `,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log("GET PLAYER INFO status:", res.status);
  if (!res.ok) throw new Error(`Fetch room failed: ${res.status}`);
  return res.json();
}

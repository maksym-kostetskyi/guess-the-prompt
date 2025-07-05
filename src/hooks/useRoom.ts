// src/hooks/useRoom.ts
import { useState, useEffect } from "react";
import type Room from "@/types/Room";
// import { createRoom } from "@/api/createRoom";
import { joinRoom } from "@/api/joinRoom";
import { getRoomInfo } from "@/api/getRoomInfo";

// interface UseRoomOptions {
//   mode: "create" | "join";
// }

export default function useRoom(
  roomId: string,
  playerName: string
) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Якщо немає roomId або playerName — припиняємо лоадер
    if (!roomId || !playerName) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        // Завжди викликаємо joinRoom при вході (навіть після reload)
        await joinRoom(roomId, playerName);
        const info = await getRoomInfo(roomId);
        setRoom(info);
      } catch (err) {
        console.log("useRoom error:", err);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [playerName, roomId]);

  useEffect(() => { console.log('Room info:', room); }, [room]);

  return { room, loading };
}

// src/hooks/useRoom.ts
import { useState, useEffect } from "react";
import type Room from "@/types/Room";
import { createRoom } from "@/api/createRoom";
import { joinRoom } from "@/api/joinRoom";
import { getRoomInfo } from "@/api/getRoomInfo";

interface UseRoomOptions {
  mode: "create" | "join";
}

export default function useRoom(
  roomId: string,
  playerName: string,
  { mode }: UseRoomOptions
) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  {
    /* const { sendMessage } = useWebSocket(roomId, (players) => {
    setRoom((r) => (r ? { ...r, players } : r));
  }); */
  }

  useEffect(() => {
    // 1) Якщо немає	roomId або playerName — припиняємо лоадер
    if (!roomId || !playerName) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        // 2) режим створення — створюємо
        if (mode === "create") {
          await createRoom(); // сервер повертає roomId, але ми вже маємо його
        }

        // 3) Приєднуємось
        await joinRoom(roomId, playerName);

        // 4) Завантажуємо дані
        const info = await getRoomInfo(roomId);

        setRoom(info);
      } catch (err) {
        console.log("useRoom error:", err);
      } finally {
        setLoading(false);
      }
    })();

    console.log(room);
  }, [roomId, playerName, mode]);

  return { room, loading };
}

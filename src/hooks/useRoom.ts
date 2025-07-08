// src/hooks/useRoom.ts
import { useState, useEffect } from "react";
import type Room from "@/types/Room";
import { joinRoom } from "@/api/joinRoom";
import { getRoomInfo } from "@/api/getRoomInfo";

async function getRoomInfoWithRetry(
  roomId: string,
  retries = 5,
  delay = 300
): Promise<Room> {
  for (let i = 0; i < retries; i++) {
    try {
      return await getRoomInfo(roomId);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Room not found");
}

export default function useRoom(roomId: string, playerName: string) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!roomId || !playerName) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        // 1. Отримуємо інфо про кімнату
        let info = await getRoomInfoWithRetry(roomId, 5, 700);
        // 2. Якщо гравець вже є — повертаємо room і нічого більше не робимо
        if (info.players.some((p: { name: string }) => p.name === playerName)) {
          if (!cancelled) setRoom(info);
        } else {
          // 3. Якщо гравця нема — робимо joinRoom, потім ще раз getRoomInfo
          try {
            await joinRoom(roomId, playerName);
          } catch {
            // Якщо joinRoom повертає 400, все одно пробуємо отримати інфо про кімнату
            // Можна додати додаткову перевірку на err.response?.status === 400
          }
          info = await getRoomInfoWithRetry(roomId, 5, 700);
          if (!cancelled) setRoom(info);
        }
      } catch {
        //if (!cancelled) setRoom(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [playerName, roomId]);

  console.log("UseRoomHook sent info:", room);

  return { room, loading };
}

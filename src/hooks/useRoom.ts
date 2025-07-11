import { useState, useEffect, useCallback } from "react";
import type Room from "@/types/Room";
import { joinRoom } from "@/api/joinRoom";
import { getRoomInfo } from "@/api/getRoomInfo";
import { useWebSocket } from "./useWebSocket";

async function getRoomInfoWithRetry(
  roomId: string,
  retries = 5,
  delay = 300
): Promise<Room> {
  for (let i = 0; i < retries; i++) {
    try {
      return await getRoomInfo(roomId);
    } catch {
      if (i === retries - 1) throw new Error("Room not found");
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error("Room not found");
}

export default function useRoom(roomId: string, playerName: string) {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1) Завантажуємо початкові дані + приєднуємо гравця
  useEffect(() => {
    let cancelled = false;
    if (!roomId || !playerName) {
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        let info = await getRoomInfoWithRetry(roomId, 5, 700);

        const alreadyJoined = info.players.some((p) => p.username === playerName);
        if (!alreadyJoined) {
          try {
            await joinRoom(roomId, playerName);
          } catch {
            // якщо 400 — пропускаємо, далі знову забираємо інфо
          }
          info = await getRoomInfoWithRetry(roomId, 5, 700);
        }

        if (!cancelled) {
          setRoom(info);
        }
      } catch (err) {
        console.error("Не вдалося отримати дані кімнати:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [roomId, playerName]);

  // 2) Колбек для оновлення по WS
  const handleRoomUpdate = useCallback((updated: Room) => {
    setRoom(updated);
  }, []);

  // 3) Підключаємо WebSocket
  const { sendMessage } = useWebSocket(roomId, handleRoomUpdate);

  return { room, loading, sendMessage };
}

import { useRef, useEffect } from "react";
import type Room from "@/types/Room";

interface WSIncoming {
  event: string;
  data?: Room;
  player?: string;
}

export function useWebSocket(
  roomId: string,
  onRoomUpdate: (room: Room) => void,
  onGameFinished?: () => void,
  onPlayerKicked?: (playerName: string) => void
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    // Якщо вже є сокет, що підключається або відкритий — не підключаємо вдруге
    const existing = socketRef.current;
    if (
      existing &&
      (existing.readyState === WebSocket.CONNECTING ||
        existing.readyState === WebSocket.OPEN)
    ) {
      return;
    }

    // Зчитуємо токен з player
    const storedPlayer = localStorage.getItem("player");
    const token = storedPlayer ? JSON.parse(storedPlayer).token : null;
    const url = token
      ? `wss://guessthepromt.store/ws/rooms/${roomId}?token=${token}`
      : `wss://guessthepromt.store/ws/rooms/${roomId}`;

    const ws = new WebSocket(url);

    ws.onopen = () => {};
    ws.onclose = () => {};

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data) as WSIncoming;
        if (msg.event === "room_update" && msg.data) {
          onRoomUpdate(msg.data);
        } else if (msg.event === "game_finished") {
          onGameFinished?.();
        } else if (msg.event === "player_kicked" && msg.player) {
          onPlayerKicked?.(msg.player);
        } else {
          // Other events
        }
      } catch (err) {
        console.error("WS message parse error:", err);
      }
    };

    socketRef.current = ws;
    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [roomId, onRoomUpdate, onGameFinished, onPlayerKicked]);

  return {
    sendMessage: (data: unknown) => {
      const ws = socketRef.current;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    },
    socketRef,
  };
}

import { useRef, useEffect } from "react";
import type Room from "@/types/Room";

interface WSIncoming {
  event: string;
  data?: Room;
}

export function useWebSocket(
  roomId: string,
  onRoomUpdate: (room: Room) => void
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
      console.log("🟡 WS skip: already connecting/open");
      return;
    }

    // Зчитуємо токен
    const token = localStorage.getItem("token");
    const url = token
      ? `wss://guessthepromt.store/ws/rooms/${roomId}?token=${token}`
      : `wss://guessthepromt.store/ws/rooms/${roomId}`;

    const ws = new WebSocket(url);

    ws.onopen = () => console.log("✅ WS connected");
    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = (e) =>
      console.log("❌ WS closed", e.code, e.reason, e.wasClean);

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data) as WSIncoming;
        if (msg.event === "room_update" && msg.data) {
          onRoomUpdate(msg.data);
        } else {
          // Інші івенти, наприклад player_joined
          console.log("🟡 WS other event:", msg.event, msg);
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
  }, [roomId, onRoomUpdate]); // <-- без token у залежностях

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

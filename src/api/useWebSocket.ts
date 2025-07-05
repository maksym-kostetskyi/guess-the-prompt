import { useRef, useEffect } from "react";
import type Room from "@/types/Room";

export function useWebSocket(
  roomId: string,
  onScoreUpdate: (players: Room["players"]) => void
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(`wss://guessthepromt.store/ws/rooms/${roomId}`);

    ws.onopen = () => console.log("✅ WS connected");
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "score_update") {
          onScoreUpdate(msg.players);
        }
      } catch (err) {
        console.error("WS message error:", err);
      }
    };
    ws.onerror = (err) => console.error("WS error:", err);
    ws.onclose = (e) => console.log("❌ WS closed", e.code, e.reason);

    socketRef.current = ws;
    return () => {
      ws.close();
    };
  }, [roomId, onScoreUpdate]);

  return {
    sendMessage: (data: unknown) => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        socketRef.current.send(JSON.stringify(data));
      }
    },
  };
}

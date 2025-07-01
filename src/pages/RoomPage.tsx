import {
  Box,
  Flex,
  VStack,
  Text,
  Image,
  Spinner,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import generateImage from "@/api/generateImage";

interface Player {
  name: string;
  role: string;
  score: number;
}

interface Room {
  room_id: string;
  players: Player[];
  state: string;
  current_turn: number;
  prompt: string;
  image_url: string;
}

export default function RoomPage() {
  const { roomId } = useParams();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const player = JSON.parse(localStorage.getItem("player") || "{}");

  const socketRef = useRef<WebSocket | null>(null);

  const handleGenerate = async (
    playerName: string,
    prompt: string,
    roomId: string
  ) => {
    try {
      const imageUrl = await generateImage(playerName, prompt, roomId);
      setImageUrl(imageUrl);
      // 💾 Зберігаємо image_url в localStorage
      localStorage.setItem(`image-${roomId}`, imageUrl);
    } catch (err) {
      console.error("Помилка генерації зображення:", err);
    }
  };

  const playerIndex: number | undefined = room?.players.findIndex(
    (player: Player) => player.role === "admin"
  );
  const role =
    room && playerIndex !== undefined && playerIndex > -1
      ? room.players[playerIndex].role
      : undefined;

  // ✅ JOIN ROOM + FETCH INFO
  useEffect(() => {
    if (!roomId || !player?.name) return;

    const joinRoom = async () => {
      setLoading(true);
      try {
        await fetch(`http://51.21.195.135:8000/rooms/${roomId}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ player_name: player.name }),
        });

        const res = await fetch(`http://51.21.195.135:8000/rooms/${roomId}`);
        if (!res.ok) throw new Error("Room not found");

        const data = await res.json();
        setRoom(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    joinRoom();
  }, [player.name, roomId]);

  // ✅ Зчитуємо image_url при завантаженні сторінки
  useEffect(() => {
    const saved = localStorage.getItem(`image-${roomId}`);
    if (saved) {
      setImageUrl(saved);
    }
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(`ws://51.21.195.135:8000/ws/rooms/testroom`);

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "score_update") {
          setRoom((prev) => {
            if (!prev) return prev;
            return {
              ...prev,
              players: data.players,
            };
          });
        }

        // інші типи, напр. image_ready, prompt_start тощо
      } catch (err) {
        console.error("Invalid WS message", err);
      }
    };

    ws.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [roomId]);

  if (loading) {
    return <Spinner size="xl" mt={20} />;
  }

  return (
    <Flex h="auto" w="100%" p={4} gap={4} bg="gray.50" direction={"column"}>
      <HStack>
        {/* LEFT: players */}
        <Box w="20%" bg="white" p={4} borderRadius="lg" boxShadow="md">
          <Text fontWeight="bold" mb={2}>
            Players
          </Text>
          <VStack align="start">
            {room &&
              room.players.map((p, i) => (
                <Text key={i}>
                  {p.name} {p.role === "admin" && "(Admin)"} — 🏅 {p.score}
                </Text>
              ))}
          </VStack>
        </Box>

        {/* CENTER: image */}
        <Box
          flex="1"
          bg="white"
          p={4}
          borderRadius="lg"
          boxShadow="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {imageUrl ? (
            <Image src={imageUrl} alt="AI generated" maxH="80%" />
          ) : (
            <Text color="gray.500">Очікуємо зображення...</Text>
          )}
        </Box>

        {/* RIGHT: settings */}
        {role === "admin" && (
          <Box w="20%" bg="white" p={4} borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold" mb={2}>
              Round options
            </Text>
          </Box>
        )}
      </HStack>

      <Input
        placeholder="Введіть промпт"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        w="full"
        bg="purple.500"
        color="white"
        _hover={{ bg: "purple.400" }}
        onClick={() => handleGenerate(player.name, prompt, roomId as string)}
      >
        Generate image
      </Button>
    </Flex>
  );
}

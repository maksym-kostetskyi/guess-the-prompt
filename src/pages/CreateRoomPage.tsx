// src/pages/CreateRoomPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, VStack, Text, Spinner } from "@chakra-ui/react";
import { createRoom } from "@/api/createRoom";
import useRoom from "../hooks/useRoom";

export default function CreateRoomPage() {
  const navigate = useNavigate();

  // читаємо ім’я гравця
  const stored = localStorage.getItem("player");
  const player = stored ? JSON.parse(stored) : { name: "" };

  // стан для нового roomId
  const [newRoomId, setNewRoomId] = useState<string | null>(null);

  // після того, як newRoomId встановлено, підключаємося через хук у режимі "create"
  const { room, loading: roomLoading } = useRoom(
    newRoomId ?? "",
    player.name,
    { mode: "create" } // режим створення → hook викличе createRoom, join, fetch, WS
  );

  // як тільки hook зарендерить room, переходимо на /room/:id
  useEffect(() => {
    if (newRoomId && room) {
      navigate(`/room/${newRoomId}`);
    }
  }, [newRoomId, room, navigate]);

  // обробник кліку "Join by ID"
  const [joinId, setJoinId] = useState("");
  const handleJoin = () => {
    if (joinId.trim()) navigate(`/room/${joinId.trim()}`);
  };

  // обробник кліку "Create room"
  const handleCreate = async () => {
    try {
      const id = await createRoom();
      setNewRoomId(id);
      localStorage.setItem("room", JSON.stringify({ roomId: id }));
    } catch (err) {
      console.error("Error creating room", err);
    }
  };

  // показуємо спінер, якщо hook у стані loading
  if (roomLoading) return <Spinner size="xl" mt={20} />;

  return (
    <Box maxW="400px" mx="auto" mt={12}>
      <VStack>
        {/* Join by existing ID */}
        <VStack w="100%">
          <Input
            placeholder="Enter room ID"
            value={joinId}
            onChange={(e) => setJoinId(e.target.value)}
          />
          <Button
            w="full"
            onClick={handleJoin}
            bg="purple.500"
            color="white"
            _hover={{ bg: "purple.600" }}
          >
            Join Room
          </Button>
        </VStack>

        <Text fontWeight="bold">— or —</Text>

        {/* Create new room */}
        <Button
          w="full"
          bg="green.500"
          color="white"
          _hover={{ bg: "green.600" }}
          onClick={handleCreate}
        >
          Create New Room
        </Button>
      </VStack>
    </Box>
  );
}

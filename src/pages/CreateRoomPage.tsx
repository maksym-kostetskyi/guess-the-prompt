// src/pages/CreateRoomPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, VStack, Text, Spinner } from "@chakra-ui/react";
import { createRoom } from "@/api/createRoom";
// import useRoom from "../hooks/useRoom";

export default function CreateRoomPage() {
  const navigate = useNavigate();

  // читаємо ім’я гравця
  // const stored = localStorage.getItem("player");
  // const player = stored ? JSON.parse(stored) : { name: "" };

  // стан для нового roomId
  const [creating, setCreating] = useState(false);

  // обробник кліку "Create room"
  const handleCreate = async () => {
    try {
      setCreating(true);
      const id = await createRoom();
      localStorage.setItem("room", JSON.stringify({ roomId: id }));
      navigate(`/room/${id}`);
    } catch (err) {
      console.error("Error creating room", err);
    } finally {
      setCreating(false);
    }
  };

  // обробник кліку "Join by ID"
  const [joinId, setJoinId] = useState("");
  const handleJoin = () => {
    if (joinId.trim()) navigate(`/room/${joinId.trim()}`);
  };



  // показуємо спінер, якщо створюється кімната
  if (creating) return <Spinner size="xl" mt={20} />;

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

import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateRoomPage() {
  const [roomID, setRoomID] = useState("");
  const navigate = useNavigate();

  async function createRoomOnServer(): Promise<string> {
    const res = await fetch(`http://51.21.195.135:8000/rooms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      throw new Error("Failed to create room");
    }

    const data = await res.json();
    return data.room_id;
  }

  const handleJoinRoom = () => {
    if (!roomID.trim()) return;
    navigate(`/room/${roomID}`);
  };

  const handleCreateRoom = async () => {
    try {
      const roomIdFromServer = await createRoomOnServer();
      localStorage.setItem(
        "room",
        JSON.stringify({ roomId: roomIdFromServer })
      );
      navigate(`/room/${roomIdFromServer}`);
    } catch {
      console.log("error creating room");
    }
  };

  return (
    <Box>
      <VStack>
        <Input
          placeholder="Увійти за ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
        />
        <Button
          onClick={handleJoinRoom}
          w="full"
          bg="purple.500"
          color="white"
          _hover={{ bg: "purple.400" }}
        >
          Увійти за ID
        </Button>
      </VStack>

      <VStack mt={10}>
        <Text fontWeight="bold">Або створити нову кімнату</Text>
        <Button
          onClick={handleCreateRoom}
          w="full"
          bg="green.500"
          color="white"
          _hover={{ bg: "green.400" }}
        >
          Створити кімнату
        </Button>
      </VStack>
    </Box>
  );
}

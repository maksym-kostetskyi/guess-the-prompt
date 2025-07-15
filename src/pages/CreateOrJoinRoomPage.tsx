import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, VStack, Text, Spinner } from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { createRoom } from "@/api/createRoom";

const CreateOrJoinRoomPage = () => {
  const navigate = useNavigate();
  const [creating, setCreating] = useState(false);
  const [joinId, setJoinId] = useState("");

  // обробник кліку "Create room"
  const handleCreate = async () => {
    try {
      setCreating(true);
      const id = await createRoom();
      if (id) {
        // Чекаємо створення кімнати, потім переходимо
        setTimeout(() => {
          navigate(`/room/${id}`);
        }, 300); // невелика затримка
      }
    } catch (err) {
      console.error("Error creating room", err);
    } finally {
      setCreating(false);
    }
  };

  // обробник кліку "Join by ID"
  const handleJoin = () => {
    if (joinId.trim()) {
      navigate(`/room/${joinId.trim()}`);
    }
  };

  if (creating) return <Spinner size="xl" mt={20} />;

  return (
    <>
      <Header />
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
            loading={creating}
          >
            Create New Room
          </Button>
        </VStack>
      </Box>
    </>
  );
};

export default CreateOrJoinRoomPage;

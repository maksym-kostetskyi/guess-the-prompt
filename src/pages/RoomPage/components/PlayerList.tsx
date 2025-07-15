import kickPlayer from "@/api/kickPlayer";
import type Player from "@/types/Player";
import { Box, VStack, Text, Button, HStack } from "@chakra-ui/react";

type PlayerListProps = {
  players: Player[];
  isHost: boolean;
  roomID: string;
};

export function PlayerList({ players, isHost, roomID }: PlayerListProps) {
  const handleKick = async (player_name: string, roomID: string) => {
    try {
      await kickPlayer(player_name, roomID);
      alert(`Player ${player_name} has been kicked from the room.`);
    } catch (error) {
      console.error("Failed to kick player:", error);
      alert("Failed to kick player. Please try again.");
    }
  };

  return (
    <Box
      flex={1}
      bg="white"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      overflowY="auto"
      w="20%"
      h="100%"
    >
      <Text fontWeight="bold" mb={2}>
        Players
      </Text>
      <VStack align="start">
        {players.map((p, i) => (
          <HStack key={i} justify="space-between" w="100%">
            <Text fontSize="sm" color="gray.600">
              {p.name} {p.role === "admin" && "(Admin)"}: {p.score}
            </Text>

            {isHost && p.name && (
              <Button
                size="xs"
                bg={"red.500"}
                _hover={{ bg: "red.400" }}
                color={"white"}
                onClick={() => p.name && handleKick(p.name, roomID)}
              >
                Kick
              </Button>
            )}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

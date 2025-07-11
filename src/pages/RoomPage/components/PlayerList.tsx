import type Player from "@/types/Player";
import { Box, VStack, Text } from "@chakra-ui/react";

export function PlayerList({ players }: { players: Player[] }) {
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
          <Text key={i}>
            {p.name} {p.role === "admin" && "(Admin)"} — 🏅 {p.score}
          </Text>
        ))}
      </VStack>
    </Box>
  );
}

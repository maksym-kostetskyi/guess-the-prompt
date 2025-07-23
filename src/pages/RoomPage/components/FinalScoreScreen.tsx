import { Box, VStack, Text, Button, HStack, Flex } from "@chakra-ui/react";
import type Player from "@/types/Player";

interface FinalScoreScreenProps {
  players: Player[];
  onBackToHome: () => void;
}

export function FinalScoreScreen({
  players,
  onBackToHome,
}: FinalScoreScreenProps) {
  // Sort players by score in descending order
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
      bg="gray.50"
      p={8}
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
    >
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="xl"
        p={8}
        maxW="600px"
        w="100%"
        textAlign="center"
      >
        <Text fontSize="4xl" fontWeight="bold" mb={6} color="purple.600">
          🎉 Game Finished! 🎉
        </Text>

        {/* Winner Section */}
        <Box
          bg="yellow.100"
          borderRadius="lg"
          p={6}
          mb={6}
          border="3px solid"
          borderColor="yellow.400"
        >
          <Text fontSize="6xl" mb={2}>
            👑
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="yellow.600" mb={2}>
            WINNER
          </Text>
          <Text fontSize="3xl" fontWeight="bold" color="gray.800" mb={2}>
            {winner?.name || winner?.username}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color="yellow.600">
            {winner?.score} points
          </Text>
        </Box>

        {/* All Players Scores */}
        <VStack gap={3} mb={6}>
          <Text fontSize="xl" fontWeight="bold" color="gray.700" mb={2}>
            Final Scores
          </Text>
          {sortedPlayers.map((player, index) => (
            <HStack
              key={player.id || index}
              justify="space-between"
              w="100%"
              p={3}
              bg={index === 0 ? "yellow.50" : "gray.50"}
              borderRadius="md"
              border={index === 0 ? "2px solid" : "1px solid"}
              borderColor={index === 0 ? "yellow.300" : "gray.200"}
            >
              <HStack>
                <Text fontSize="lg" fontWeight="bold" color="gray.600">
                  #{index + 1}
                </Text>
                <Text
                  fontSize={index === 0 ? "xl" : "lg"}
                  fontWeight={index === 0 ? "bold" : "medium"}
                  color={index === 0 ? "yellow.700" : "gray.700"}
                >
                  {player.name || player.username}
                  {player.role === "admin" && " (Admin)"}
                </Text>
              </HStack>
              <Text
                fontSize={index === 0 ? "xl" : "lg"}
                fontWeight="bold"
                color={index === 0 ? "yellow.600" : "gray.600"}
              >
                {player.score} pts
              </Text>
            </HStack>
          ))}
        </VStack>

        <Button
          size="lg"
          color="white"
          bg="purple.500"
          _hover={{ bg: "purple.400" }}
          onClick={onBackToHome}
          w="100%"
        >
          Back to Home
        </Button>
      </Box>
    </Flex>
  );
}

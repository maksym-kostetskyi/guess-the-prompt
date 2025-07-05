import { Box, Text, VStack } from "@chakra-ui/react";

export function SettingsPanel() {
  return (
    <Box
      flex={1}
      bg="white"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      h="100%"
      w="20%"
    >
      <Text fontWeight="bold" mb={2}>
        Host Settings
      </Text>
      <VStack align="stretch">
        <Text fontSize="sm">🛠 Round options</Text>
        <Text fontSize="sm">❌ Kick players</Text>
      </VStack>
    </Box>
  );
}

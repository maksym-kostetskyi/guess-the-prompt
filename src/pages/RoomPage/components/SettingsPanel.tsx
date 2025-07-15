import React from "react";
import type Settings from "@/types/Settings";
import { Box, HStack, Text, VStack, Button } from "@chakra-ui/react";

interface SettingsPanelProps extends Settings {
  onChange?: (settings: Settings) => void;
  isHost?: boolean;
}

export function SettingsPanel({
  round_count,
  prompt_words,
  turn_length,
  onChange,
  isHost = true,
}: SettingsPanelProps) {
  // Варіанти для кожної опції
  const roundCountOptions = [5, 10];
  const promptWordsOptions = [1, 2];
  const turnLengthOptions = [60, 120];

  // Локальний стан для вибору
  const [selected, setSelected] = React.useState({
    round_count,
    prompt_words,
    turn_length,
  });

  // Чи змінилися налаштування
  const changed =
    selected.round_count !== round_count ||
    selected.prompt_words !== prompt_words ||
    selected.turn_length !== turn_length;

  // Хендлер вибору
  const handleSelect = (key: keyof Settings, value: number) => {
    if (!isHost) return;
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  // Хендлер застосування
  const handleApply = () => {
    if (onChange) onChange(selected);
  };

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
        Game Settings
      </Text>
      <VStack align="stretch" gap={2}>
        {/* Round count */}
        <HStack justify="space-between" w="100%">
          <Text fontSize="sm">🛠 Round count</Text>
          {roundCountOptions.map((opt) =>
            selected.round_count === opt ? (
              <Button
                key={opt}
                size="sm"
                variant="outline"
                borderColor="black"
                color="gray.800"
                fontWeight="bold"
                justifyContent="center"
                disabled
                _disabled={{ opacity: 1, cursor: "default", bg: "white" }}
                style={{ minWidth: 40 }}
              >
                {opt}
              </Button>
            ) : (
              <Button
                key={opt}
                size="sm"
                bg="purple.500"
                color="white"
                _hover={{ bg: "purple.400" }}
                borderRadius="md"
                borderWidth={1}
                borderColor="purple.500"
                onClick={() => handleSelect("round_count", opt)}
                disabled={!isHost}
                style={{ minWidth: 40 }}
              >
                {opt}
              </Button>
            )
          )}
        </HStack>
        {/* Prompt words */}
        <HStack justify="space-between" w="100%">
          <Text fontSize="sm">📝 Prompt words</Text>
          {promptWordsOptions.map((opt) =>
            selected.prompt_words === opt ? (
              <Button
                key={opt}
                size="sm"
                variant="outline"
                borderColor="black"
                color="gray.800"
                fontWeight="bold"
                justifyContent="center"
                disabled
                _disabled={{ opacity: 1, cursor: "default", bg: "white" }}
                style={{ minWidth: 40 }}
              >
                {opt}
              </Button>
            ) : (
              <Button
                key={opt}
                size="sm"
                bg="purple.500"
                color="white"
                _hover={{ bg: "purple.400" }}
                borderRadius="md"
                borderWidth={1}
                borderColor="purple.500"
                onClick={() => handleSelect("prompt_words", opt)}
                disabled={!isHost}
                style={{ minWidth: 40 }}
              >
                {opt}
              </Button>
            )
          )}
        </HStack>
        {/* Turn length */}
        <HStack justify="space-between" w="100%">
          <Text fontSize="sm">⏱ Turn length</Text>
          {turnLengthOptions.map((opt) =>
            selected.turn_length === opt ? (
              <Button
                key={opt}
                size="sm"
                variant="outline"
                borderColor="black"
                color="gray.800"
                fontWeight="bold"
                justifyContent="center"
                disabled
                _disabled={{ opacity: 1, cursor: "default", bg: "white" }}
                style={{ minWidth: 40 }}
              >
                {opt}
              </Button>
            ) : (
              <Button
                key={opt}
                size="sm"
                bg="purple.500"
                color="white"
                _hover={{ bg: "purple.400" }}
                borderRadius="md"
                borderWidth={1}
                borderColor="purple.500"
                onClick={() => handleSelect("turn_length", opt)}
                disabled={!isHost}
                style={{ minWidth: 40 }}
              >
                {opt}
              </Button>
            )
          )}
        </HStack>
        {/* Change settings button */}
        {isHost && (
          <Button
            mt={2}
            bg="green.500"
            color="white"
            _hover={{ bg: "green.400" }}
            disabled={!changed}
            onClick={handleApply}
          >
            Change settings
          </Button>
        )}
      </VStack>
    </Box>
  );
}

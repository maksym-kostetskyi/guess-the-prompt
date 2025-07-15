import { useEffect, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

interface RoomInfoProps {
  totalRounds: number;
  promptWords: number;
  turnLength: number;
  ws?: React.RefObject<WebSocket | null>;
}

const RoomInfo = ({
  totalRounds,
  promptWords,
  turnLength,
  ws,
}: RoomInfoProps) => {
  const [timeLeft, setTimeLeft] = useState(turnLength);
  const [round, setRound] = useState(1);

  // Listen for server events only

  useEffect(() => {
    if (!ws) return;
    const wsCurrent = ws.current;
    const handler = (event: MessageEvent) => {
      try {
        const data =
          typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (
          data.event === "timer_update" &&
          typeof data.seconds_left === "number"
        ) {
          setTimeLeft(data.seconds_left);
        }
        if (data.event === "turn_started") {
          if (typeof data.round_number === "number")
            setRound(data.round_number);
          if (typeof data.turn_length === "number")
            setTimeLeft(data.turn_length);
        }
      } catch {
        console.error("Failed to parse message:", event.data);
      }
    };
    wsCurrent?.addEventListener("message", handler);
    return () => wsCurrent?.removeEventListener("message", handler);
  }, [ws]);

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
      <VStack align="stretch" gap={2}>
        <HStack justify="space-between">
          <Text fontWeight="bold">Round</Text>
          <Text>
            {round} / {totalRounds}
          </Text>
        </HStack>
        <HStack justify="space-between">
          <Text fontWeight="bold">Words in prompt</Text>
          <Text>{promptWords}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text fontWeight="bold">Time left</Text>
          <Text>{timeLeft} сек</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RoomInfo;

import { Input, Button, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { makeGuess } from "@/api/makeGuess";

export function GuessInput({ playerName, roomId, onGuess}: {
  playerName: string;
  roomId: string;
  onGuess?: () => void;
  buttonColorScheme?: "green" | "purple";
}) {
  const [guess, setGuess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGuess = async () => {
    if (!guess.trim()) return;
    setLoading(true);
    try {
      await makeGuess(roomId, playerName, guess);
      setGuess("");
      onGuess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack w="100%">
      <Input
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={loading}
      />
      <Button
        w="full"
        color="white"
        bg="green.500"
        _hover={{ bg: "green.400" }}
        onClick={handleGuess}
        loading={loading}
      >
        Submit Guess
      </Button>
    </VStack>
  );
}

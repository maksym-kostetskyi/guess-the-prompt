import { Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import generateImage from "@/api/generateImage";

export function PromptInput({
  playerName,
  roomId,
  onNewImage,
}: {
  playerName: string;
  roomId: string;
  onNewImage: (url: string) => void;
  buttonColorScheme?: "green" | "purple";
}) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    const url = await generateImage(playerName, prompt, roomId);
    onNewImage(url);
  };

  return (
    <>
      <Input
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button
        w="full"
        color="white"
        bg="green.500"
        _hover={{ bg: "green.400" }}
        onClick={handleGenerate}
      >
        Generate image
      </Button>
    </>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Flex, HStack, Spinner, Text, VStack, Button } from "@chakra-ui/react";
import { PlayerList } from "./components/PlayerList";
import { RoomImage } from "./components/RoomImage";
import { SettingsPanel } from "./components/SettingsPanel";
import { PromptInput } from "./components/PromptInput";
import { GuessInput } from "./components/GuessInput";
import { Header } from "@/components/Header";
import useRoom from "../../hooks/useRoom";
import { leaveRoom } from "@/api/leaveRoom";
import nextTurn from "@/api/nextTurn";

const RoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const stored = localStorage.getItem("player");
  const player = stored ? JSON.parse(stored) : { name: "" };

  // Якщо немає імені — редірект
  useEffect(() => {
    if (!player.name) {
      navigate("/");
    }
  }, [player.name, navigate]);

  const { room, loading } = useRoom(roomId!, player.name);
  const [imageUrl, setImageUrl] = useState<string>("");

  // Підтягуємо image_url із room у локальний state
  const roomImageUrl = room?.image_url;

  useEffect(() => {
    if (roomImageUrl) {
      setImageUrl(roomImageUrl);
    }
  }, [roomImageUrl]);

  if (loading) {
    return <Spinner size="xl" mt={20} />;
  }

  if (!room) {
    return (
      <Text mt={20} textAlign="center">
        Room not found or error loading room
      </Text>
    );
  }

  const isAdmin = room.current_admin === player.name;
  const isPrompter = room.current_prompter === player.name;

  const handleLeaveRoom = async () => {
    await leaveRoom(roomId!, player.name);
    navigate("/room");
  };

  const handleNextTurn = async () => {
    await nextTurn(roomId!);
    setImageUrl(""); // Очищуємо URL, щоб оновити зображення
  };

  return (
    <>
      <Header />

      <Flex
        direction="column"
        justify="space-between"
        align="center"
        h="80vh"
        w="90vw"
        p={10}
        color="gray.800"
        gap={4}
      >
        <HStack justify="space-between" h="80%" w="100%">
          <PlayerList players={room.players} />
          <RoomImage imageUrl={imageUrl} />
          {isAdmin && <SettingsPanel />}
        </HStack>

        <VStack h="min-content" w="30%" justify="center">
          <Button
            w="full"
            mb={4}
            color="white"
            bg="purple.500"
            _hover={{ bg: "purple.400" }}
            onClick={handleLeaveRoom}
          >
            Leave Room
          </Button>
          {!isPrompter ? (
            <GuessInput
              playerName={player.name}
              roomId={roomId!}
              onGuess={() => {}}
              buttonColorScheme="green"
            />
          ) : (
            <PromptInput
              playerName={player.name}
              roomId={roomId!}
              onNewImage={setImageUrl}
              buttonColorScheme="purple"
            />
          )}

          {isAdmin && (
            <Button
              w="full"
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              onClick={handleNextTurn}
            >
              Next Turn
            </Button>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default RoomPage;

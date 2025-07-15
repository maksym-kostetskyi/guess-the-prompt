import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Flex, HStack, Spinner, VStack, Button } from "@chakra-ui/react";
import { PlayerList } from "./components/PlayerList";
import { RoomImage } from "./components/RoomImage";
import { SettingsPanel } from "./components/SettingsPanel";
import { PromptInput } from "./components/PromptInput";
import { GuessInput } from "./components/GuessInput";
import { Header } from "@/components/Header";
import useRoom from "../../hooks/useRoom";
import { leaveRoom } from "@/api/leaveRoom";
import startGame from "@/api/startGame";
import type Settings from "@/types/Settings";
import changeSettings from "@/api/changeSettings";
import RoomInfo from "./components/RoomInfo";

const RoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const stored = localStorage.getItem("player");
  const player = stored ? JSON.parse(stored) : { name: "" };
  const [gameStarted, setGameStarted] = useState(false);
  const { room, loading, socketRef } = useRoom(roomId!, player.name);
  const [imageUrl, setImageUrl] = useState<string>("");
  const roomImageUrl = room?.image_url;
  const isAdmin = room?.current_admin === player.name;
  const isPrompter = room?.current_prompter === player.name;
  const [settings, setSettings] = useState<Settings>({
    round_count: 5,
    prompt_words: 2,
    turn_length: 60,
  });

  // Якщо немає імені — редірект
  useEffect(() => {
    if (!player.name) {
      navigate("/");
    }
  }, [player.name, navigate]);

  useEffect(() => {
    if (roomImageUrl) {
      setImageUrl(roomImageUrl);
    }
  }, [roomImageUrl]);

  useEffect(() => {
    if (room) {
      if (room.state !== "waiting") {
        setGameStarted(true);
      }
    }
  }, [room]);

  if (loading) {
    return <Spinner size="xl" mt={20} />;
  }

  const handleLeaveRoom = async () => {
    await leaveRoom(roomId!, player.name);
    navigate("/room");
  };

  const handleStartGame = async () => {
    try {
      const roomSettings = await startGame(roomId!);
      setSettings(roomSettings.settings);
      setGameStarted(true);
    } catch (error) {
      console.error("Failed to start game:", error);
      alert("Failed to start game. Please try again.");
    }
  };

  const handleChangeSettings = async (newSettings: Settings) => {
    try {
      await changeSettings(roomId!, newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error("Failed to change settings:", error);
      alert("Failed to change settings. Please try again.");
    }
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
          <PlayerList
            players={room?.players ?? []}
            isHost={isAdmin}
            roomID={roomId!}
          />

          <RoomImage imageUrl={imageUrl} />

          {!gameStarted && (
            <SettingsPanel
              round_count={settings.round_count}
              prompt_words={settings.prompt_words}
              turn_length={settings.turn_length}
              isHost={isAdmin}
              onChange={handleChangeSettings}
            />
          )}

          {gameStarted && (
            <RoomInfo
              totalRounds={settings.round_count}
              promptWords={settings.prompt_words}
              turnLength={settings.turn_length}
              ws={socketRef}
            />
          )}
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

          {gameStarted && !isPrompter && (
            <GuessInput
              playerName={player.name}
              roomId={roomId!}
              onGuess={() => {}}
              buttonColorScheme="green"
            />
          )}

          {gameStarted && isPrompter && (
            <PromptInput
              playerName={player.name}
              roomId={roomId!}
              onNewImage={setImageUrl}
              buttonColorScheme="purple"
            />
          )}

          {isAdmin && !gameStarted && (
            <Button
              w="full"
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              onClick={handleStartGame}
            >
              Start Game
            </Button>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default RoomPage;

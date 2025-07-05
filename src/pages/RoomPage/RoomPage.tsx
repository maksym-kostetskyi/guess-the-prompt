import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Flex, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { PlayerList } from "./components/PlayerList";
import { RoomImage } from "./components/RoomImage";
import { SettingsPanel } from "./components/SettingsPanel";
import { PromptInput } from "./components/PromptInput";
import { Header } from "@/components/Header";
import useRoom from "../../hooks/useRoom";

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const stored = localStorage.getItem("player");
  const player = stored ? JSON.parse(stored) : { name: "" };

  const { room, loading } = useRoom(roomId!, player.name, { mode: "join" });
  const [imageUrl, setImageUrl] = useState<string>("");

  // Підтягуємо image_url із room у локальний state
  const roomImageUrl = room?.image_url;

  useEffect(() => {
    console.log(room, loading);
  }, [loading, room]);

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

  const current = room.players.find((p) => p.name === player.name);
  const isAdmin = current?.role === "admin";

  return (
    <>
      <Header />

      <Flex
        direction="column"
        justify="space-between"
        align="center"
        h="80vh"
        w="90vw"
        bg="gray.50"
        p={10}
      >
        <HStack justify="space-between" h="80%" w="100%">
          <PlayerList players={room.players} />
          <RoomImage imageUrl={imageUrl} />
          {isAdmin && <SettingsPanel />}
        </HStack>

        <VStack h="min-content" w="30%" justify="center">
          <PromptInput
            playerName={player.name}
            roomId={roomId!}
            onNewImage={setImageUrl}
          />
        </VStack>
      </Flex>
    </>
  );
}

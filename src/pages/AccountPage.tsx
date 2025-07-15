import { getPlayerInfo } from "@/api/getPlayerInfo";
import type Player from "@/types/Player";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const storedPlayer = localStorage.getItem("player");
  const playerName = storedPlayer ? JSON.parse(storedPlayer) : { name: "Guest" };
  const navigate = useNavigate();
  const [playerInfo, setPlayerInfo] = useState<Player>({
    id: 0,
    username: playerName.name || "Guest",
    total_games: 0,
    total_score: 0,
    avatar_url: "",
    role: "player",
    score: 0,
    name: playerName.name || "Guest",
  });

  const handleLogout = () => {
    localStorage.removeItem("player");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    // Check if player data is available
    if (!storedPlayer) {
      // If not, redirect to login page
      navigate("/");
    }
  }, [storedPlayer, navigate]);

  useEffect(() => {
    // Fetch player data from API
    // This will update local storage with the latest player info
    const fetchPlayerData = async () => {
      try {
        const playerData = await getPlayerInfo();
        setPlayerInfo(playerData);
      } catch (error) {
        console.error("Failed to fetch player data:", error);
        // Optionally, you can redirect to login if fetching fails
      }
    };

    fetchPlayerData();
  }, []);
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100%"
      w="100%"
      bg="gray.50"
      p={4}
      color={"gray.800"}
    >
      <Heading mb={6}>Account</Heading>

      <Text mb={4}>Hello, {playerInfo.username}!</Text>

      <VStack mb={8}>
        <Text mb={2}>Total Games: {playerInfo.total_games || 0}</Text>
        <Text mb={2}>Total Score: {playerInfo.total_score || 0}</Text>
        <Text mb={2}>Avatar URL: {playerInfo.avatar_url || "No avatar set"}</Text>
      </VStack>

      <Button
        bgColor="green.500"
        _hover={{ bgColor: "green.400" }}
        color={"white"}
        mb={4}
        onClick={() => navigate("/room")}
      >
        Back to game
      </Button>

      <Button
        bgColor="purple.500"
        _hover={{ bgColor: "purple.400" }}
        color={"white"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Flex>
  );
};

export default AccountPage;

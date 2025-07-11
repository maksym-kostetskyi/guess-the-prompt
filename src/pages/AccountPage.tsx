import { getPlayerInfo } from "@/api/getPlayerInfo";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const storedPlayer = localStorage.getItem("player");
  const player = storedPlayer ? JSON.parse(storedPlayer) : { name: "Guest" };
  const navigate = useNavigate();

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
        localStorage.setItem("player", JSON.stringify(playerData));
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

      <Text mb={4}>Hello, {player.name}!</Text>

      <VStack mb={8}>
        <Text mb={2}>Total Games: {player.total_games || 0}</Text>
        <Text mb={2}>Total Score: {player.total_score || 0}</Text>
        <Text mb={2}>Avatar URL: {player.avatar_url || "No avatar set"}</Text>
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

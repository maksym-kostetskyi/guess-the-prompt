import {
  Flex,
  Box,
  Image,
  Text,
  HStack,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function Header() {
  const navigate = useNavigate();
  const [name, setName] = useState<string | null>(null);
  const [isAccount, setIsAccount] = useState(false);

  useEffect(() => {
    // Зчитуємо дані один раз при маунті
    const storedPlayer = localStorage.getItem("player");
    const storedToken = localStorage.getItem("token");

    // name з гостя чи з облікового запису
    if (storedPlayer) {
      try {
        const { name } = JSON.parse(storedPlayer);
        setName(name ?? null);
      } catch {
        setName(null);
      }
    } else {
      setName(null);
    }

    // Розрізняємо обліковку за наявністю токена
    setIsAccount(!!storedToken);
  }, []);

  const handleChangeName = () => {
    localStorage.removeItem("player");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <Flex
      gap={4}
      as="header"
      align="center"
      borderRadius={8}
      px={4}
      py={2}
      bg="white"
      boxShadow="sm"
    >
      {/* Лого */}
      <Box cursor="pointer" onClick={() => navigate("/")}>
        <Image src="/guess-the-prompt.png" alt="Logo" boxSize="40px" />
      </Box>

      <Spacer />

      <Text fontSize="lg" fontWeight="bold" color="gray.800">
        Guess the Prompt
      </Text>

      <Spacer />

      <HStack>
        {/* Гість (no token) */}
        {!isAccount && name && (
          <>
            <Text color="gray.800">Hi, {name}</Text>
            <Button
              color="white"
              bg="purple.500"
              _hover={{ bg: "purple.400" }}
              onClick={handleChangeName}
            >
              Change Name
            </Button>
            <Button
              color="white"
              bg="green.500"
              _hover={{ bg: "green.400" }}
              onClick={handleLogin}
            >
              Log In
            </Button>
          </>
        )}

        {/* Авторизований */}
        {isAccount && (
          <>
            <Text color="gray.800">Hi, {name}</Text>
            <Button
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              onClick={() => navigate("/account")}
            >
              Account
            </Button>
          </>
        )}
      </HStack>
    </Flex>
  );
}

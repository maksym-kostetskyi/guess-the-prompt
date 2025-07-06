// src/components/Header.tsx
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

  // Read nickname from localStorage on mount
  useEffect(() => {
    const check = () => {
      const stored = localStorage.getItem("player");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setName(parsed.name ?? null);
          setIsAccount(!!parsed.token || !!parsed.isAccount || !!parsed.password);
        } catch {
          setName(null);
          setIsAccount(false);
        }
      } else {
        setName(null);
        setIsAccount(false);
      }
    };
    check();
    const interval = setInterval(check, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSetName = () => {
    // clear stored name and navigate to home/join
    localStorage.removeItem("player");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("player");
    setName(null);
    setIsAccount(false);
    navigate("/");
  };

  return (
    <Flex gap={4} as="header" align="center" borderRadius={8} px={4} py={2} color={"white"} border={"1px solid #e2e8f0"} bg="white" boxShadow="sm">
      {/* Left: Logo */}
      <Box cursor="pointer" onClick={() => navigate("/")}>
        <Image src="/guess-the-prompt.png" alt="Logo" boxSize="40px" />
      </Box>

      {/* Center: Title */}
      <Spacer />
      <Text fontSize="lg" fontWeight="bold" textAlign="center" color="gray.800">
        Guess the Prompt
      </Text>
      <Spacer />

      {/* Right: User actions */}
      <HStack>
        {name ? (
          <>
            <Text color="gray.800">Hi, {name}</Text>
            <Button color="white"
              bg="purple.500"
              _hover={{ bg: "purple.400" }} 
              onClick={handleSetName}>
                Change Name
            </Button>
            {isAccount ? (
              <Button 
              color="white"
              bg="green.500"
              _hover={{ bg: "green.400" }} 
              onClick={handleLogout}>
                Log Out
              </Button>
            ) : (
              <Button 
              color="white"
              bg="green.500"
              _hover={{ bg: "green.400" }} 
              onClick={handleLogin}>
                Log In
              </Button>
            )}
          </>
        ) : (
          <Button colorScheme="purple" size="sm" variant="outline" onClick={handleSetName}>
            Set Name
          </Button>
        )}
      </HStack>
    </Flex>
  );
}

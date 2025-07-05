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

  // Read nickname from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("player");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setName(parsed.name ?? null);
      } catch {
        setName(null);
      }
    }
  }, []);

  const handleSetName = () => {
    // clear stored name and navigate to home/join
    localStorage.removeItem("player");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Flex as="header" align="center" px={4} py={2} bg="white" boxShadow="sm">
      {/* Left: Logo */}
      <Box cursor="pointer" onClick={() => navigate("/")}>
        <Image src="/logo192.png" alt="Logo" boxSize="40px" />
      </Box>

      {/* Center: Title */}
      <Spacer />
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        Guess the Prompt
      </Text>
      <Spacer />

      {/* Right: User actions */}
      <HStack>
        {name ? (
          <>
            <Text>Hi, {name}</Text>
            <Button size="sm" variant="outline" onClick={handleSetName}>
              Change Name
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" onClick={handleSetName}>
            Set Name
          </Button>
        )}
        <Button size="sm" colorScheme="purple" onClick={handleLogin}>
          Log In
        </Button>
      </HStack>
    </Flex>
  );
}

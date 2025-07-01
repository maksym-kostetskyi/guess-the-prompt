import RuleSlider from "@/components/RuleSlider";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  VStack,
  useBreakpointValue,
  Avatar,
  AvatarGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSaveName = () => {
    if (!name.trim()) return;

    localStorage.setItem("player", JSON.stringify({ name }));
    console.log("Ім’я збережено:", name);
    navigate("/room");
  };

  useEffect(() => {
    const stored = localStorage.getItem("player");
    if (stored) {
      const parsed = JSON.parse(stored);

      if (parsed.name) {
        navigate("/room");
      }
    }
  }, [navigate]);

  return (
    <Flex
      direction={isMobile ? "column" : "row"}
      align="center"
      justify="center"
      bgGradient="linear(to-r, green.200, pink.500)"
      gap={20}
      h="auto"
      boxSizing="border-box"
    >
      <Box
        w="250px"
        h="300px"
        border="2px solid"
        borderColor="gray.300"
        borderRadius="lg"
        bgGradient="linear(to-r, green.200, pink.500)"
      />
      {/* LEFT: Join Card */}
      <Box
        bg="whiteAlpha.900"
        borderRadius="xl"
        boxShadow="lg"
        p={6}
        w="250px"
        h="300px"
        mb={isMobile ? 6 : 0}
      >
        <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">
          АНОНІМНО
        </Text>

        <VStack>
          <AvatarGroup size="xl">
            <Avatar.Root>
              <Avatar.Fallback />
              <Avatar.Image />
            </Avatar.Root>
          </AvatarGroup>
          <Input
            placeholder="Ваше ім’я"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            w="full"
            bg="purple.500"
            color="white"
            _hover={{ bg: "purple.400" }}
            onClick={() => handleSaveName()}
          >
            Розпочати
          </Button>
        </VStack>
      </Box>

      {/* RIGHT: Game Rules */}
      <RuleSlider />
    </Flex>
  );
}

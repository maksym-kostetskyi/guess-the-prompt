import RuleSlider from "@/pages/LoginPage/components/RuleSlider";
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
import { registerAccount } from "@/api/registerAccount";
import { loginAccount } from "@/api/loginAccount";

export default function JoinPage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [name, setName] = useState("");
  const [authTab, setAuthTab] = useState<"anon" | "login" | "register">("anon");
  const [authUsername, setAuthUsername] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleSaveName = () => {
    if (!name.trim()) return;

    localStorage.setItem("player", JSON.stringify({ name }));
    console.log("Ім’я збережено:", name);
    navigate("/room");
  };

  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await loginAccount(authUsername, authPassword);
      if (!res.ok) throw new Error("Помилка входу");
      // тут можна зберегти токен, якщо сервер повертає
      localStorage.setItem("player", JSON.stringify({ name: authUsername }));
      navigate("/room");
    } catch {
      setAuthError("Невірний логін або пароль");
    } finally {
      setAuthLoading(false);
    }
  };
  const handleRegister = async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await registerAccount(authUsername, authPassword);
      if (!res.ok) throw new Error("Помилка реєстрації");
      localStorage.setItem("player", JSON.stringify({ name: authUsername }));
      navigate("/room");
    } catch {
      setAuthError("Помилка реєстрації або логін вже зайнятий");
    } finally {
      setAuthLoading(false);
    }
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
      {/* JOIN CARD (ширше, з кнопками зверху) */}
      <Box
        bg="whiteAlpha.900"
        borderRadius="xl"
        boxShadow="lg"
        p={6}
        w="520px"
        h="340px"
        mb={isMobile ? 6 : 0}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        {/* Tabs/Buttons on top */}
        <Flex w="100%" mb={4}>
          <Button
            flex={1}
            colorScheme="green"
            variant={authTab === "anon" ? "solid" : "outline"}
            borderRightRadius={0}
            borderLeftRadius="md"
            borderRightWidth={1}
            borderColor="gray.200"
            color="white"
            _active={{ bg: "green.600" }}
            _hover={{ bg: authTab === "anon" ? "green.600" : undefined }}
            onClick={() => setAuthTab("anon")}
          >
            АНОНІМНО
          </Button>
          <Button
            flex={1}
            colorScheme="purple"
            variant={authTab === "login" ? "solid" : "outline"}
            borderLeftRadius={0}
            borderRightRadius="md"
            color="white"
            _active={{ bg: "purple.600" }}
            _hover={{ bg: authTab === "login" ? "purple.600" : undefined }}
            onClick={() => setAuthTab("login")}
          >
            Залогінитись
          </Button>
        </Flex>
        {/* Content under tabs */}
  {authTab === "anon" && (
    <VStack w="100%" gap={4}>
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
        )}
  {authTab === "login" && (
    <VStack w="100%" gap={4}>
            <Input
              placeholder="Логін"
              value={authUsername}
              onChange={(e) => setAuthUsername(e.target.value)}
            />
            <Input
              placeholder="Пароль"
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
            />
      <Button
        w="full"
        colorScheme="purple"
        loading={authLoading}
        onClick={handleLogin}
      >
        Увійти
      </Button>
      <Button
        variant="ghost"
        colorScheme="purple"
        onClick={() => setAuthTab("register")}
      >
        Створити акаунт
      </Button>
      {authError && <Text color="red.500">{authError}</Text>}
          </VStack>
        )}
  {authTab === "register" && (
    <VStack w="100%" gap={4}>
            <Input
              placeholder="Логін"
              value={authUsername}
              onChange={(e) => setAuthUsername(e.target.value)}
            />
            <Input
              placeholder="Пароль"
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
            />
      <Button
        w="full"
        colorScheme="purple"
        variant="solid"
        borderRadius="md"
        loading={authLoading}
        onClick={handleRegister}
      >
        Створити акаунт
      </Button>
      <Button
        variant="ghost"
        colorScheme="purple"
        onClick={() => setAuthTab("login")}
      >
        Увійти
      </Button>
      {authError && <Text color="red.500">{authError}</Text>}
          </VStack>
        )}
      </Box>
      {/* Game Rules */}
      <RuleSlider />
    </Flex>
  );
}

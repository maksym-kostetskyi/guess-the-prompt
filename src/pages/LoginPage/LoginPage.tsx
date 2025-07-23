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

const LoginPage = () => {
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
    localStorage.setItem("player", JSON.stringify({ name, token: null }));
    navigate("/room");
  };

  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError("");
    try {
      // loginAccount повертає { access_token, token_type }
      const { access_token } = await loginAccount(authUsername, authPassword);
      // зберігаємо ім’я гравця і токен разом
      localStorage.setItem(
        "player",
        JSON.stringify({ name: authUsername, token: access_token })
      );
      navigate("/room");
    } catch (err) {
      console.error(err);
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
      localStorage.setItem(
        "player",
        JSON.stringify({ name: authUsername, token: null })
      );
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
            bgColor="green.600"
            borderLeftRadius="md"
            borderColor="gray.200"
            _hover={{ bgColor: "green.500" }}
            color="white"
            onClick={() => setAuthTab("anon")}
          >
            ANONYM
          </Button>
          <Button
            flex={1}
            color="white"
            bgColor="yellow.600"
            _hover={{ bgColor: "yellow.500" }}
            onClick={() => setAuthTab("login")}
          >
            LOGIN
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
              placeholder="Nickname"
              color="gray.800"
              type="string"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              w="full"
              color="white"
              bg="purple.500"
              _hover={{ bg: "purple.400" }}
              onClick={() => handleSaveName()}
            >
              START
            </Button>
          </VStack>
        )}
        {authTab === "login" && (
          <VStack w="100%" gap={4}>
            <Input
              placeholder="Nickname"
              color="gray.800"
              type="string"
              value={authUsername}
              onChange={(e) => setAuthUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              color="gray.800"
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
            />
            <Button
              w="full"
              color="white"
              bg="purple.500"
              _hover={{ bg: "purple.400" }}
              loading={authLoading}
              onClick={handleLogin}
            >
              LOGIN
            </Button>
            <Button
              variant="ghost"
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              onClick={() => setAuthTab("register")}
            >
              Create account
            </Button>
            {authError && <Text color="red.500">{authError}</Text>}
          </VStack>
        )}
        {authTab === "register" && (
          <VStack w="100%" gap={4}>
            <Input
              placeholder="Nickname"
              color="gray.800"
              type="string"
              value={authUsername}
              onChange={(e) => setAuthUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              color="gray.800"
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
            />
            <Button
              w="full"
              color="white"
              bg="blue.500"
              _hover={{ bg: "blue.400" }}
              borderRadius="md"
              loading={authLoading}
              onClick={handleRegister}
            >
              CREATE ACCOUNT
            </Button>
            <Button
              color="white"
              bg="purple.500"
              _hover={{ bg: "purple.400" }}
              onClick={() => setAuthTab("login")}
            >
              Login
            </Button>
            {authError && <Text color="red.500">{authError}</Text>}
          </VStack>
        )}
      </Box>
      {/* Game Rules */}
      <RuleSlider />
    </Flex>
  );
};

export default LoginPage;

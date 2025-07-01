import { Text, HStack, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const slides = [
  "Краще бути на зв'язку: говоріть через Discord або Zoom",
  "Кожен гравець вводить підказку, інші вгадують її",
  "Автор отримує бал, якщо вгадає хоч хтось, але не всі",
  "Хост може обрати кількість слів для підказки",
];

export default function RuleSlider() {
  const [index, setIndex] = useState(0);

  return (
    <Flex
      direction="column"
      justify="space-between"
      border="2px solid"
      borderColor="gray.300"
      borderRadius="lg"
      w="250px"
      h="300px"
      p={6}
    >
      <Text fontSize="md" textAlign="center">
        {slides[index]}
      </Text>

      <HStack justify="center" mt={4}>
        {slides.map((_, i) => (
          <Button
            key={i}
            onClick={() => setIndex(i)}
            bg={i === index ? "purple.500" : "gray.300"}
            _hover={{ bg: i === index ? "purple.600" : "gray.400" }}
            borderRadius="full"
            minW="15px"
            h="15px"
            p={0}
          />
        ))}
      </HStack>
    </Flex>
  );
}

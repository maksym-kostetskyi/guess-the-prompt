import { Text, HStack, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const slides = [
  "Better stay in touch: talk via Discord or Zoom",
  "Each player enters a prompt, others try to guess it",
  "The author gets a point if someone guesses it, but not everyone",
  "The host can choose the number of words for the prompt",
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

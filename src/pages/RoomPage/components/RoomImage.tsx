import { Box, Image, Text } from "@chakra-ui/react";

export function RoomImage({ imageUrl }: { imageUrl: string }) {
  return (
    <Box
      flex={2}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      h="100%"
      w="auto"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Ai Generated image"
          objectFit="cover"
          w="100%"
        />
      ) : (
        <Text color="gray.500">Waiting for image…</Text>
      )}
    </Box>
  );
}

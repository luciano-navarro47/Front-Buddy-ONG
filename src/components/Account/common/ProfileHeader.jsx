import { Box, Heading, Text } from "@chakra-ui/react";

export default function ProfileHeader({ title, subtitle }) {
  return (
    <Box position="sticky" top="0" zIndex="10" bg="brand.green.100" p="4" borderRadius="md" mb="6">
      <Heading size="lg">{title}</Heading>
      <Text mt="5" color="blackAlpha">
        {subtitle}
      </Text>
    </Box>
  );
}

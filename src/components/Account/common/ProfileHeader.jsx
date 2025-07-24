import { Box, Heading, Text } from "@chakra-ui/react";

export default function ProfileHeader({ title, subtitle }) {
  return (
    <Box bg="brand.green.100" p="4" borderRadius="md" mb="6">
      <Heading size="lg">{title}</Heading>
      <Text mt="2" color="gray.700">
        {subtitle}
      </Text>
    </Box>
  );
}

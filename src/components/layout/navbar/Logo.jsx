import React from "react";
import { Image, Box } from "@chakra-ui/react";

export default function Logo({
  src,
  onClick,
  boxSize = { base: "40px", md: "56px" },
}) {
  return (
    <Box display="flex" alignItems="center" cursor="pointer" onClick={onClick}>
      <Image src={src} boxSize={boxSize} objectFit="contain" alt="Buddy logo" />
    </Box>
  );
}

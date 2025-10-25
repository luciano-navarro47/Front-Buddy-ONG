import React from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Center,
  Icon,
  Avatar,
  AvatarGroup,
  Flex,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { GiSittingDog, GiCat } from "react-icons/gi";
import { RiHeartAddLine } from "react-icons/ri";
import { avatars } from "../../utils/constants/collaborators-info";
import logo from "../../assets/images/logo_negro.png";

export default function LandingHero() {
  return (
    <Stack spacing={{ base: 10, md: 5 }} align="center" justify="center">
      <Box textAlign="center">
        <Center>
          <Image src={logo} alt="logo" width="70%" />
        </Center>
        <Heading
          fontWeight="bold"
          fontFamily="body"
          color="gray.700"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "4xl" }}
          mt={4}
        >
          ¡Tu ayuda suma!
        </Heading>

        <Center mt="2rem">
          <Stack direction="row" spacing={4}>
            <Icon
              as={GiSittingDog}
              p={1}
              border="2px solid"
              color="orange"
              boxShadow="lg"
              boxSize={10}
              borderRadius={50}
            />
            <Icon
              as={RiHeartAddLine}
              p={1}
              border="2px solid"
              color="brand.green.300"
              boxShadow="lg"
              boxSize={10}
              borderRadius={50}
            />
            <Icon
              as={GiCat}
              p={1}
              border="2px solid"
              color="orange"
              boxShadow="lg"
              boxSize={10}
              borderRadius={50}
            />
          </Stack>
        </Center>
      </Box>

      <Center>
        <Stack direction="row" spacing={3} align="center">
          <AvatarGroup>
            {avatars.map((avatar) => (
              <Avatar
                key={avatar.name}
                name={avatar.name}
                src={avatar.img}
                zIndex={2}
                boxShadow="lg"
                _before={{
                  content: '""',
                  w: "full",
                  h: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient: "linear(to-bl, red.400,orange.400)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              />
            ))}
          </AvatarGroup>

          <Text fontFamily="heading" fontSize={{ base: "4xl", md: "6xl" }}>
            +
          </Text>

          <Flex
            align="center"
            justify="center"
            fontFamily="heading"
            fontSize={{ base: "sm", md: "lg" }}
            bg="brand.green.300"
            color="white"
            rounded="full"
            boxShadow="lg"
            borderStyle="dotted"
            borderWidth="0.2rem"
            borderColor="orange.200"
            minW={useBreakpointValue({ base: "60px", md: "75px" })}
            minH={useBreakpointValue({ base: "60px", md: "75px" })}
          >
            <Text fontWeight="bold">VOS</Text>
          </Flex>
        </Stack>
      </Center>
    </Stack>
  );
}

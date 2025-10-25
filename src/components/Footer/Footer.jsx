import React from "react";
import {
  Box,
  Image,
  Container,
  SimpleGrid,
  Stack,
  Text,
  chakra,
  Link,
  Wrap,
  WrapItem,
  Avatar,
  Tooltip,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from "react-icons/fa";
import logo from "../../assets/images/logo_negro.png";

import lucho from "../../assets/images/lucho_avatar.png";
import juli from "../../assets/images/juli.png";

const TEAM_MEMBERS = [
  {
    name: "Luciano Navarro",
    img: lucho,
    linkedin: "https://www.linkedin.com/in/lucho47-dev/",
  },
  {
    name: "Julian Navarro",
    img: juli,
    linkedin: "https://www.linkedin.com/in/julian-navarro-b25938247/",
  },
];

const SocialButton = ({ label, href, icon }) => (
  <chakra.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    w={8}
    h={8}
    rounded="full"
    bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
    _hover={{ bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200") }}
  >
    {icon}
  </chakra.a>
);

const FooterLogo = ({ onClick }) => (
  <Image
    src={logo}
    alt="Buddy"
    boxSize={{ base: "64px", md: "80px" }}
    objectFit="contain"
    onClick={onClick}
    cursor="pointer"
  />
);

function TeamAvatars({ members }) {
  return (
    <Wrap spacing={3} align="center">
      {members.map((m) => (
        <WrapItem key={m.name}>
          <Tooltip label={m.name} placement="top" hasArrow>
            <Link href={m.linkedin} isExternal>
              <Avatar size="sm" src={m.img} name={m.name} cursor="pointer" />
            </Link>
          </Tooltip>
        </WrapItem>
      ))}
    </Wrap>
  );
}

function TeamAccordion({ members }) {
  return (
    <Accordion allowToggle>
      <AccordionItem border="none" p={0}>
        <h2>
          <AccordionButton px={0} _hover={{ bg: "transparent" }}>
            <Box flex="1" textAlign="left" fontWeight="600">
              Equipo
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel px={0} pt={3}>
          <Stack spacing={1}>
            {members.map((m) => (
              <Link
                key={m.name}
                href={m.linkedin}
                isExternal
                _hover={{ color: "orange.400", fontWeight: "semibold" }}
              >
                {m.name}
              </Link>
            ))}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}

export default function Footer() {
  const bg = "brand.green.100";
  const textColor = useColorModeValue("gray.700", "gray.200");

  return (
    <Box
      bg={bg}
      color={textColor}
      as="footer"
      role="contentinfo"
      py={{ base: 6, md: 8 }}
    >
      <Container maxW="7xl">
        <SimpleGrid
          columns={{ base: 1, md: 3, lg: 4 }}
          spacing={{ base: 6, md: 8 }}
        >
          {/* LOGO + COPYRIGHT + REDES */}
          <Stack spacing={3}>
            <FooterLogo
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            />
            <Text fontSize="sm" color="gray.700">
              © {new Date().getFullYear()} Buddy ONG. Todos los derechos.
            </Text>
            <HStack spacing={3}>
              <SocialButton label="Twitter" href="#" icon={<FaTwitter />} />
              <SocialButton label="YouTube" href="#" icon={<FaYoutube />} />
              <SocialButton label="Instagram" href="#" icon={<FaInstagram />} />
              <SocialButton label="LinkedIn" href="#" icon={<FaLinkedin />} />
            </HStack>
          </Stack>

          <Stack align="flex-start" spacing={2}>
            <Text fontWeight="600">Compañía</Text>
            <Link href="#" _hover={{ color: "orange.400" }}>
              About us
            </Link>
            <Link href="#" _hover={{ color: "orange.400" }}>
              Blog
            </Link>
            <Link href="#" _hover={{ color: "orange.400" }}>
              Contacto
            </Link>
            <Link href="#" _hover={{ color: "orange.400" }}>
              Pricing
            </Link>
          </Stack>

          <Stack align="flex-start" spacing={3}>
            <Text fontWeight="600">Contribuidores activos</Text>

            <TeamAvatars members={TEAM_MEMBERS.slice(0, 8)} />

            <Box pt={0}>
              <TeamAccordion members={TEAM_MEMBERS} />
            </Box>
          </Stack>

          <Stack align="flex-start" spacing={2}>
            <Text fontWeight="600">Proyecto</Text>
            <Text fontSize="sm" color="gray.700" maxW="xs">
              Proyecto de ejemplo para gestión de adopciones y donaciones. Si
              querés colaborar, contactanos.
            </Text>
            <Link href="#" _hover={{ color: "orange.400" }}>
              Ver repo
            </Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

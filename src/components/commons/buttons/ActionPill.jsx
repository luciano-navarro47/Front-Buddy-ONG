import React from "react";
import {
  Button,
  Box,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

/**
 * Props:
 * - children: label
 * - icon: a React element (optional)
 * - count: number or string (optional) -> shown after label
 * - onClick: function (optional)
 * - isDisabled: bool
 * - colorScheme / bg / color / size
 * - tooltip: string (optional)
 * - ...rest chakra props
 */
export default function ActionPill({
  children,
  icon,
  count,
  onClick,
  isDisabled,
  tooltip,
  colorScheme = "orange",
  bg,
  color,
  ...rest
}) {
  const defaultBg =
    bg || (colorScheme === "orange" ? "orange.100" : `${colorScheme}.100`);
  const hoverBg = useColorModeValue("orange.200", "gray.700");

  const content = (
    <HStack spacing={1} px={1} py={1} borderRadius="md">
      {icon && (
        <Box as="span" aria-hidden display="flex" alignItems="center" justifyContent="center">
          {icon}
        </Box>
      )}
      <Text
        as="span"
        fontSize={{ base: "xs", sm: "md" }}
        color={color || "inherit"}
      >
        {children}
      </Text>
      {typeof count !== "undefined" && (
        <Text
          as="span"
          fontSize={{ base: "xs", sm: "md" }}
          fontWeight="semibold"
          color={color || "inherit"}
        >
          {`${count}`}
        </Text>
      )}
    </HStack>
  );

  if (onClick) {
    const btn = (
      <Button
        onClick={onClick}
        isDisabled={isDisabled}
        bg={defaultBg}
        _hover={{ bg: hoverBg }}
        _active={{ transform: "scale(0.99)" }}
        borderRadius="md"
        // boxShadow="sm"
        px={2}
        py={2}
        mb={4}
        maxW="fit-content"
        whiteSpace="normal"
        textAlign="center"
        w={{ base: "100%", sm: "auto" }}
        fontSize={{ base: "xs", sm: "md" }}
        {...rest}
      >
        {content}
      </Button>
    );

    return btn;
  }

  const box = (
    <Box
      bg={defaultBg}
      borderRadius="md"
      px={4}
      py={3}
      mb={4}
      maxW="fit-content"
      boxShadow="sm"
      whiteSpace="normal"
      textAlign="center"
      w={{ base: "100%", sm: "auto" }}
      fontSize={{ base: "xs", sm: "md" }}
      cursor="default"
      {...rest}
    >
      {content}
    </Box>
  );

  return box;
}

ActionPill.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  tooltip: PropTypes.string,
  colorScheme: PropTypes.string,
  bg: PropTypes.string,
  color: PropTypes.string,
};

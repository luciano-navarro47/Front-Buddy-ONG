import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Text,
  HStack,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import ReusableModal from "./ReusableModal";

export default function ImageGalleryModal({
  isOpen,
  onClose,
  images = [],
  startIndex = 0,
  title,
  showThumbnails = true,
  onViewDetails,
}) {
  const [index, setIndex] = useState(startIndex || 0);

  useEffect(() => {
    if (isOpen) setIndex(startIndex ?? 0);
  }, [isOpen, startIndex]);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(images.length - 1, i + 1)),
    [images.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, prev, next, onClose]);

  if (!images || images.length === 0) {
    return (
      <ReusableModal
        isOpen={isOpen}
        onClose={onClose}
        title={title || "Imágenes"}
      >
        <Text>No hay imágenes disponibles.</Text>
      </ReusableModal>
    );
  }

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title={title || `Fotos (${index + 1}/${images.length})`}
      size="xl"
      footer={
        <Flex w="100%" justify="space-between" align="center">
          <HStack>
            <IconButton
              aria-label="Anterior"
              icon={<ArrowLeftIcon />}
              onClick={prev}
              isDisabled={index === 0}
              size="sm"
            />
            <IconButton
              aria-label="Siguiente"
              icon={<ArrowRightIcon />}
              onClick={next}
              isDisabled={index === images.length - 1}
              size="sm"
            />
          </HStack>

          <HStack spacing={2}>
            {onViewDetails && (
              <Button
                size="sm"
                background="white"
                onClick={() => onViewDetails(index)}
                _hover={{ backgroundColor: "brand.green.100" }}
              >
                Ver detalles
              </Button>
            )}
            <Button
              size="sm"
              onClick={onClose}
              _hover={{ backgroundColor: "red.500", color: "white" }}
            >
              Cerrar
            </Button>
          </HStack>
        </Flex>
      }
    >
      <Flex direction="column" align="center" gap={4}>
        <Box>
          <Image
            src={images[index]}
            maxH="60vh"
            maxW="100%"
            objectFit="contain"
            borderRadius="md"
          />
        </Box>

        {showThumbnails && images.length > 1 && (
          <HStack spacing={2} overflow="auto" w="100%" justify="center" px={2}>
            {images.map((src, i) => (
              <Box
                key={i}
                border={i === index ? "2px solid" : "1px solid"}
                borderColor={i === index ? "teal.400" : "gray.200"}
                borderRadius="md"
                p={0.5}
                cursor="pointer"
                onClick={() => setIndex(i)}
              >
                <Image
                  src={src}
                  boxSize="60px"
                  objectFit="cover"
                  borderRadius="sm"
                />
              </Box>
            ))}
          </HStack>
        )}
      </Flex>
    </ReusableModal>
  );
}

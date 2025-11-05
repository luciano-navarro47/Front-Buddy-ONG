import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Image,
  IconButton,
  VStack,
  Text,
  Progress,
  Input,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { setImagesInCloudinary } from "utils/cloudinary/setImagesCloudinary";

function makeId() {
  return Math.random().toString(36).slice(2, 9);
}

export default function UploadImages({
  setImages,
  multiple = true,
  maxFiles = 3,
  previewSize = 72, // px
  error,
}) {
  const toast = useToast();
  const [localFiles, setLocalFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    return () => {
      localFiles.forEach((it) => {
        if (it.previewUrl) URL.revokeObjectURL(it.previewUrl);
      });
    };
  }, [localFiles]);

  const handleSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = Math.max(0, maxFiles - localFiles.length);
    const allowed = files.slice(0, remainingSlots);
    if (!allowed.length) return;

    const newLocal = allowed.map((file) => ({
      uid: makeId(),
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      uploadedUrl: null,
    }));

    const startIndex = localFiles.length;

    setLocalFiles((prev) => [...prev, ...newLocal]);

    try {
      setUploading(true);

      const urls = await setImagesInCloudinary(allowed, {
        onProgress: (relativeIndex, percent) => {
          const absoluteIndex = startIndex + relativeIndex;
          setLocalFiles((prev) =>
            prev.map((it, idx) =>
              idx === absoluteIndex ? { ...it, progress: percent } : it
            )
          );
        },
      });

      setLocalFiles((prev) => {
        const updated = prev.map((it, idx) => {
          if (idx >= startIndex) {
            const urlIdx = idx - startIndex;
            return {
              ...it,
              uploadedUrl: urls[urlIdx] || null,
              progress: 100,
            };
          }
          return it;
        });

        const uploadedUrls = updated.map((i) => i.uploadedUrl).filter(Boolean);

        if (multiple) {
          setImages(uploadedUrls);
        } else {
          setImages(
            uploadedUrls.length ? [uploadedUrls[uploadedUrls.length - 1]] : []
          );
        }

        return updated;
      });
    } catch (err) {
      console.error("Error subiendo imágenes:", err);
      toast({
        title: "Error al subir imágenes",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setLocalFiles((prev) =>
        prev.map((it, idx) => {
          if (idx >= startIndex) {
            return { ...it, progress: 0 };
          }
          return it;
        })
      );
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = (idx) => {
    const toRemove = localFiles[idx];
    if (!toRemove) return;

    if (toRemove.previewUrl) URL.revokeObjectURL(toRemove.previewUrl);

    const next = [...localFiles];
    next.splice(idx, 1);
    setLocalFiles(next);

    const remainingUrls = next.map((n) => n.uploadedUrl).filter(Boolean);
    if (multiple) setImages(remainingUrls);
    else setImages(remainingUrls[0] ? [remainingUrls[0]] : []);
  };

  return (
    <VStack align="start" spacing={2}>
      <HStack spacing={3}>
        <label>
          <Input
            type="file"
            display="none"
            multiple={multiple}
            accept="image/*"
            onChange={handleSelect}
            disabled={localFiles.length >= maxFiles}
            required={false}
            aria-required={false}
            tabIndex={-1}
          />
          <Button
            size="sm"
            as="span"
            isDisabled={localFiles.length >= maxFiles}
          >
            <AddIcon />
          </Button>
        </label>

        <Text fontSize="sm" color="gray.500">
          {localFiles.length > 0
            ? `${localFiles.length} seleccionado(s)`
            : `0 seleccionados`}
        </Text>
      </HStack>

      <HStack spacing={3} overflowX="auto" w="100%" py={1}>
        {localFiles.map((item, i) => {
          const isUploadingFile = item.progress > 0 && item.progress < 100;
          const showSpinner =
            (!item.uploadedUrl && item.progress > 0) || isUploadingFile;
          return (
            <Box
              key={item.uid}
              position="relative"
              w={`${previewSize}px`}
              h={`${previewSize}px`}
              borderRadius="md"
              overflow="hidden"
              border="1px solid"
              borderColor="gray.200"
              flex="0 0 auto"
            >
              <Image
                src={item.previewUrl}
                objectFit="cover"
                w="100%"
                h="100%"
                alt={`preview-${i}`}
              />

              {showSpinner && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="blackAlpha.500"
                  zIndex="5"
                >
                  <Spinner size="sm" />
                </Box>
              )}

              {item.progress > 0 && item.progress < 100 && (
                <Progress
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  size="xs"
                  value={item.progress}
                />
              )}

              <IconButton
                size="xs"
                aria-label="remove"
                icon={<CloseIcon />}
                position="absolute"
                top="4px"
                right="4px"
                onClick={() => handleRemove(i)}
                bg="whiteAlpha.800"
                isDisabled={item.progress > 0 && item.progress < 100}
              />
            </Box>
          );
        })}
      </HStack>

      {error ? (
        <Box mt={2}>
          <p
            style={{
              margin: 0,
              fontSize: "0.875rem",
              color: "var(--chakra-colors-red-500)",
            }}
          >
            {error}
          </p>
        </Box>
      ) : null}
    </VStack>
  );
}

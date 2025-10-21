import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { CloseIcon, AddIcon } from "@chakra-ui/icons";
import { setImagesInCloudinary } from "utils/cloudinary/setImagesCloudinary";

export default function UploadImage({
  setImages,
  multiple = true,
  maxFiles = 3,
  previewSize = 72, // px
}) {
  const toast = useToast();
  const [localFiles, setLocalFiles] = useState([]); // { file, previewUrl, progress, uploadedUrl }
  const [uploading, setUploading] = useState(false);

  const handleSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const allowed = files.slice(0, Math.max(1, maxFiles - localFiles.length));
    const newLocal = allowed.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      uploadedUrl: null,
    }));

    setLocalFiles((prev) => [...prev, ...newLocal]);

    try {
      setUploading(true);

      const urls = await setImagesInCloudinary(allowed, {
        onProgress: (index, percent) => {
          setLocalFiles((prev) =>
            prev.map((it) => {
              const matchIndex = allowed.findIndex((f) => f === it.file);
              if (matchIndex >= 0) {
                return it.file === allowed[matchIndex]
                  ? { ...it, progress: percent }
                  : it;
              }

              return it;
            })
          );
        },
      });
      setLocalFiles((prev) => {
        const start = prev.length - allowed.length;
        return prev.map((it, idx) => {
          if (idx >= start) {
            const urlIdx = idx - start;
            return { ...it, uploadedUrl: urls[urlIdx], progress: 100 };
          }
          return it;
        });
      });

      if (multiple) {
        setImages(urls);
      } else {
        setImages([urls[0]]);
      }
    } catch (err) {
      toast({ title: "Error al subir imagenes", status: "error" });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (idx) => {
    URL.revokeObjectURL(localFiles[idx].previewUrl);
    const next = [...localFiles];
    next.splice(idx, 1);
    setLocalFiles(next);

    const remainingUrls = next.map((n) => n.uploadedUrl).filter(Boolean);
    if (multiple) setImages(remainingUrls);
    else setImages(remainingUrls[0] || null);
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
        {localFiles.map((item, i) => (
          <Box
            key={i}
            position="relative"
            w={`${previewSize}px`}
            h={`${previewSize}px`}
            borderRadius="md"
            overflow="hidden"
            border="1px solid"
            borderColor="gray.200"
          >
            <Image
              src={item.previewUrl}
              objectFit="cover"
              w="100%"
              h="100%"
              alt={`preview-${i}`}
            />

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
            />
          </Box>
        ))}
      </HStack>
    </VStack>
  );
}

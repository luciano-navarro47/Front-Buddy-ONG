import { Th, Box } from "@chakra-ui/react";
import { useRef, useState } from "react";

export function ResizableTh({ children, initialWidth = 200 }) {
  const [width, setWidth] = useState(initialWidth);
  const startXRef = useRef(null);
  const startWidthRef = useRef(null);
  console.log("WIDHT: ", width)

  const onMouseDown = (e) => {
    startXRef.current = e.clientX;
    startWidthRef.current = width;

    const onMouseMove = (e) => {
      const delta = e.clientX - startXRef.current;
      const newWidth = Math.max(25, startWidthRef.current + delta);

      setWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Th
      w={`${width}px`}
      minW="25px"
      position="relative"
      userSelect="none"
      textAlign="center"
      fontSize="15px"
    >
      <Box isTruncated>{children}</Box>
      <Box
        onMouseDown={onMouseDown}
        cursor="col-resize"
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        mb={2}
        width="4px"
        borderRadius="md"
        backgroundColor="gray.300"
        _hover={{ backgroundColor: "teal.300" }}
      />
    </Th>
  );
}

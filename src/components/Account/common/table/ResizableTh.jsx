import { Th, Box } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function ResizableTh({ children, initialWidth = 100, minWidth=5 }) {
  const [width, setWidth] = useState(initialWidth);
  const startXRef = useRef(null);
  const startWidthRef = useRef(null);

  const onMouseDown = (e) => {
    startXRef.current = e.clientX;
    startWidthRef.current = width;

    const onMouseMove = (e) => {
      const delta = e.clientX - startXRef.current;
      const newWidth = Math.max(minWidth, startWidthRef.current + delta);

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
      minW={`${minWidth}px`}
      position="sticky"
      top="0"
      zIndex="10"
      bg="brand.green.100"
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
        mt={1}
        mb={1}
        width="5px"
        borderRadius="md"
        backgroundColor="white"
        _hover={{ backgroundColor: "teal.300" }}
      />
    </Th>
  );
}

import React, { useMemo } from "react";
import {
  SimpleGrid,
  Button,
  IconButton,
  HStack,
  Center,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

/**
 * Props:
 * - itemsPerPage: number
 * - totalItems: number
 * - currentPage: number (1-based)
 * - onPageChange: function(pageNumber) => void
 * - maxButtons?: number (how many page number buttons to show, default 7)
 */
export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
  maxButtons = 4,
}) {
  const totalPages = Math.max(
    1,
    Math.ceil((totalItems || 0) / (itemsPerPage || 1))
  );

  const page = Math.min(Math.max(currentPage || 1, 1), totalPages);

  const pages = useMemo(() => {
    const pagesArr = [];

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pagesArr.push(i);
      return pagesArr;
    }

    const half = Math.floor(maxButtons / 2);
    let start = page - half;
    let end = page + half;

    if (start <= 1) {
      start = 1;
      end = maxButtons - 1; // leave room for last page
    } else if (end >= totalPages) {
      start = totalPages - (maxButtons - 2);
      end = totalPages;
    }

    pagesArr.push(1);

    if (start > 2) {
      pagesArr.push("left-ellipsis");
    }

    for (let i = Math.max(2, start); i <= Math.min(end, totalPages - 1); i++) {
      pagesArr.push(i);
    }

    if (end < totalPages - 1) {
      pagesArr.push("right-ellipsis");
    }

    if (totalPages > 1) pagesArr.push(totalPages);

    return pagesArr;
  }, [totalPages, page, maxButtons]);

  const handleClick = (p) => {
    if (p === "left-ellipsis" || p === "right-ellipsis") return;
    if (p < 1 || p > totalPages) return;
    if (p === page) return;
    onPageChange(p);
  };

  return (
    <SimpleGrid columns={[1]} spacing={4}>
      <Center mt="1rem">
        <HStack spacing={2} wrap="wrap">
          <IconButton
            aria-label="Página anterior"
            icon={<MdArrowBackIosNew />}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            isDisabled={page <= 1}
            size="sm"
          />
          {pages.map((p, idx) =>
            typeof p === "number" ? (
              <Button
                key={p}
                size="sm"
                variant={p === page ? "solid" : "ghost"}
                colorScheme={p === page ? "orange" : "gray"}
                onClick={() => handleClick(p)}
              >
                <VisuallyHidden>Ir a página</VisuallyHidden>
                <Text as="span">{p}</Text>
              </Button>
            ) : (
              <Button key={`${p}-${idx}`} size="sm" variant="ghost" isDisabled>
                …
              </Button>
            )
          )}
          <IconButton
            aria-label="Página siguiente"
            icon={<MdArrowForwardIos />}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
            isDisabled={page >= totalPages}
            size="sm"
          />
        </HStack>
      </Center>
    </SimpleGrid>
  );
}

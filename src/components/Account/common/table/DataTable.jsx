import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  TableContainer,
  Td,
} from "@chakra-ui/react";
import ResizableTh from "components/account/common/table/ResizableTh";

export default function DataTable({
  columns,
  data,
  rowKey,
  maxHeight = "70vh",
}) {
  const rows = useMemo(() => data, [data]);

  console.log("ROWS: ", rows)

  return (
    <TableContainer overflowX="auto" overflowY="auto" maxH={maxHeight} w="100%">
      <Table
        variant="striped"
        colorScheme="blackAlpha"
        sx={{ tableLayout: "fixed" }}
      >
        <Thead position="sticky" top={0} bg="white" zIndex={1}>
          <Tr>
            {columns.map(
              ({ key, header, initialWidth = 100, minWidth = 25 }) => (
                <ResizableTh
                  key={key}
                  initialWidth={initialWidth}
                  minWidth={minWidth}
                >
                  {header}
                </ResizableTh>
              )
            )}
          </Tr>
        </Thead>

        <Tbody>
          {rows.map((row) => (
            <Tr key={row[rowKey] || row.id || Math.random()}>
              {columns.map(({ key, renderCell }) => (
                <Td key={key} px={4} py={2} isTruncated>
                  {renderCell
                    ? renderCell(row[key], row)
                    : String(row[key] ?? "-")}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

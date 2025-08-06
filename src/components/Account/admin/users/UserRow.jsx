import { useState } from "react";
import { Tr, Td, Tooltip, Select } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
export default function UserRow({ user, onStatusChange, pendingStatus }) {
  const [showToolTip, setShowToolTip] = useState(false);
  const [iconColor, setIconColor] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.id);
    setIconColor(true);
    setShowToolTip(true);
  };

  const handleSelectChange = (e) => {
    onStatusChange(user.id, e.target.value);
  }

  return (
    <Tr>
      <Td textAlign="center" isTruncated>
        <Tooltip
          label="Copiado"
          placement="top"
          hasArrow
          isOpen={showToolTip}
          borderRadius="md"
        >
          <CopyIcon
            cursor="pointer"
            mr={2}
            boxSize={5}
            color={iconColor ? "orange" : "black"}
            onClick={handleCopy}
            onMouseLeave={() => [setShowToolTip(false), setIconColor(false)]}
          />
        </Tooltip>
        {user.id}
      </Td>
      <Td textAlign="center" isTruncated>
        {user.first_name} {user.last_name}
      </Td>
      <Td textAlign="center" isTruncated>
        {user.email}
      </Td>
      <Td textAlign="center" isTruncated>
        {user.username}
      </Td>
      <Td textAlign="center" isTruncated>
        {user.phone}
      </Td>
      <Td textAlign="center" isTruncated>
        {user.role}
      </Td>
      <Td textAlign="center" isTruncated>
        <Select
          size="sm"
          maxW="120px"
          value={pendingStatus ?? user.status}
          onChange={handleSelectChange}
          borderColor={pendingStatus ? "orange" : "gray.200" }
          borderWidth={pendingStatus ? "2px" : "1px" }
          _hover={{ borderColor: pendingStatus ? "orange.400" : "gray.300"}}
        >
          <option value="active">Activo</option>
          <option value="banned">Bloqueado</option>
        </Select>
      </Td>
      <Td textAlign="center" isTruncated>
        {user.customer}
      </Td>
    </Tr>
  );
}

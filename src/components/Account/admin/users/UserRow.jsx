import { useState } from "react";
import { Tr, Td, Tooltip } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
export default function UserRow({ user }) {
  const [showToolTip, setShowToolTip] = useState(false);
  const [iconColor, setIconColor] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.id);
    setIconColor(true);
    setShowToolTip(true);
  };

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
      <Td textAlign="center" isTruncated >{user.first_name + " " + user.last_name}</Td>
      <Td textAlign="center" isTruncated>{user.email}</Td>
      <Td textAlign="center" isTruncated>{user.username}</Td>
      <Td textAlign="center" isTruncated>{user.phone}</Td>
      <Td textAlign="center" isTruncated>{user.role}</Td>
      <Td textAlign="center" isTruncated>{user.status}</Td>
      <Td textAlign="center" isTruncated>{user.customer}</Td>
    </Tr>
  );
}

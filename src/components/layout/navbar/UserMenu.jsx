import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import stringToColor from "utils/stringToColor";

export default function UserMenu({
  currentUser,
  userName,
  userPicture,
  handleLogout,
  buttonProps = {},
}) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="ghost"
        p={0}
        minW={0}
        {...buttonProps}
      >
        {userPicture ? (
          <Avatar size="sm" src={userPicture} name={userName} />
        ) : (
          <Avatar
            size="sm"
            name={userName || "U"}
            bg={stringToColor(userName)}
            color="white"
          />
        )}
      </MenuButton>

      <MenuList>
        <MenuItem as={NavLink} to="/account">
          Cuenta
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleLogout && handleLogout();
          }}
        >
          Cerrar sesión
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

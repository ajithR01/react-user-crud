import React, { useState } from "react";
import { AppBar, Toolbar, Box, IconButton, Paper, InputBase, Menu, MenuItem } from "@mui/material";
import { FiSearch, FiPlus, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/slices/userModalSlice";
import { logout } from "../../../redux/slices/authSlice";

const MobileNavbar: React.FC<{ search: string; setSearch: (value: string) => void }> = ({ search, setSearch }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static" color="default" className="shadow-md">
        <Toolbar className="flex justify-between">
          <h2 className="text-lg font-semibold">Users</h2>

          <Box className="flex items-center gap-3">
            <IconButton onClick={() => dispatch(openModal(null))}>
              <FiPlus className="text-2xl text-blue-500" />
            </IconButton>

            <IconButton onClick={handleClick}>
              <FaUserCircle className="text-2xl text-gray-700" />
            </IconButton>

            {/* Logout Option */}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  dispatch(logout());
                  handleClose();
                }}
                className="flex items-center gap-2"
              >
                <FiLogOut />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Search */}
      <Box className="p-2">
        <Paper className="relative w-full flex items-center p-2 rounded-lg shadow-sm">
          <InputBase
            placeholder="Search users..."
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FiSearch className="text-gray-500" />
        </Paper>
      </Box>
    </>
  );
};

export default MobileNavbar;

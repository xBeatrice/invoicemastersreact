import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Import the profile icon
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const handleProfileClick = () => {
    window.location.href = "/profilePage"; // Use window.location.href to change the URL
  };
  return (
    <AppBar position="static" sx={{ height: "100px" }}>
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1, mt: "1%" }}>
          InvoiceMasters
        </Typography>
        <IconButton
          color="inherit"
          sx={{ mt: "20px" }}
          onClick={handleProfileClick}
        >
          <AccountCircleIcon sx={{ fontSize: 44 }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ height: "100px" }}>
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1, mt: "1%" }}>
          InvoiceMasters
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

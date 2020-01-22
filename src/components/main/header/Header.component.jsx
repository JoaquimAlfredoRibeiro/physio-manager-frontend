import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import NotificationsIcon from "@material-ui/icons/Notifications";

import "./Header.style.scss";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <AppBar
          position="static"
          className="teste"
          style={{ boxShadow: "none" }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              className="button"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h7" className="tabTitle">
              Tab Title Placeholder
            </Typography>
            <IconButton>
              <NotificationsIcon />
            </IconButton>
            <IconButton>
              <AccountBoxIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;

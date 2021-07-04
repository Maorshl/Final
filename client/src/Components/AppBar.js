import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import useStyles from "../Style";
import { AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drewer from "./Drewer";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";

export default function MenuAppBar({ setUser }) {
  const userName = Cookies.get("userName");
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logout = async e => {
    await axios
      .post("http://localhost:8080/user/logout", {
        refreshToken: Cookies.get("refreshToken"),
      })
      .then(() => {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("userName");
        setUser(null);
        window.location = "/";
      });
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // useEffect(() => {
  //   axios.get(
  //     `http://localhost:8080/user/getNotifications?userName=${userName}`
  //   );
  // }, []);

  return (
    <div className={classes.rootAppBar}>
      <AppBar position="static">
        <Toolbar>
          <Drewer />
          <Typography variant="h6" className={classes.titleAppBar}>
            Smart library
          </Typography>
          <NotificationsNoneIcon />
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
              <IconButton
                id="logoutButton"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={logout}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

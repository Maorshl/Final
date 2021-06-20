import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drewer from "./Drewer";
import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar({ setUser }) {
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const logout = async (e) => {
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Drewer />
          <Typography variant="h6" className={classes.title}>
            Smart library
          </Typography>
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

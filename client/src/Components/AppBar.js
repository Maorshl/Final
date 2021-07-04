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
import Button from "@material-ui/core/Button";
import StyledMenuItem from "../Style/StyledMenuItem";
import StyledMenu from "../Style/StyledMenu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function MenuAppBar({ setUser }) {
  const userName = Cookies.get("userName");
  const classes = useStyles();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEI, setNotofications] = useState(null);
  const [notificationNum, setNotificationNum] = useState();
  const [unReadPosts, setUnreadPosts] = useState([]);
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
  const handleClickNotification = event => {
    setNotofications(event.currentTarget);
  };

  const handleCloseNotification = () => {
    setNotofications(null);
  };

  useEffect(() => {
    const getNotifications = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/user/getNotifications?userName=${userName}`
      );
      setUnreadPosts(data);
      const getUnRead = data.filter(post => {
        return !post.read;
      });
      setNotificationNum(getUnRead.length);
    };
    getNotifications();
  }, []);

  return (
    <div className={classes.rootAppBar}>
      <AppBar position="static">
        <Toolbar>
          <Drewer />
          <Typography variant="h6" className={classes.titleAppBar}>
            Smart library
          </Typography>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClickNotification}
          >
            <NotificationsNoneIcon />
            {notificationNum}
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={notificationsEI}
            keepMounted
            open={Boolean(notificationsEI)}
            onClose={handleCloseNotification}
          >
            <StyledMenuItem></StyledMenuItem>
          </StyledMenu>
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

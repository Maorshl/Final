import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
} from "@material-ui/core";
import useStyles from "../Style";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Drewer from "./Drewer";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Button from "@material-ui/core/Button";
import StyledMenu from "../Style/StyledMenu";
import Notifications from "./Notifications";

export default function MenuAppBar({ setUser }) {
  const userName = Cookies.get("userName");
  const classes = useStyles();
  const auth = true;
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsEI, setNotificationsEI] = useState(null);
  const [notificationNum, setNotificationNum] = useState(0);
  const [unReadNotification, setUnreadNotifications] = useState([]);
  const open = Boolean(anchorEl);

  //* When user log out, delete all the Cookies and tokens at the DB
  const logout = async (e) => {
    await axios
      .post("http://app.smartlibrary.link:8080/user/logout", {
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

  //* When the use click at the notifications button, it is updated at the DB that all is read.
  const handleClickNotification = (event) => {
    setNotificationsEI(event.currentTarget);
    axios
      .patch(
        `http://app.smartlibrary.link:8080/user/updateNotification?userName=${userName}`
      )
      .then(() => setNotificationNum(0));
  };

  const handleCloseNotification = () => {
    setNotificationsEI(null);
  };

  //* When the page is up, it ask for all notification, and give the number of unread as the notifications number.
  useEffect(() => {
    getNotifications().then((result) => {
      setUnreadNotifications(result);

      const unRead = result.filter((notification) => !notification.read);
      setNotificationNum(unRead.length);
    });
  }, []);

  return (
    <div className={classes.rootAppBar}>
      <AppBar position="static">
        <Toolbar>
          <Drewer />
          <Typography variant="h6" className={classes.titleAppBar}>
            Smart library Hello {userName}! 🖐
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
            id="simple-menu"
            anchorEl={notificationsEI}
            keepMounted
            open={Boolean(notificationsEI)}
            onClose={handleCloseNotification}
          >
            <div className="notifications-div">
              {unReadNotification
                .slice(0)
                .reverse()
                .map((notification, i) => {
                  return <Notifications notification={notification} key={i} />;
                })}
            </div>
          </StyledMenu>
          {auth && (
            <div>
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

  async function getNotifications() {
    const { data } = await axios.get(
      `http://app.smartlibrary.link:8080/user/getNotifications?userName=${userName}`
    );
    return data;
  }
}

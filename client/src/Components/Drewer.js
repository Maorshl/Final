import React from "react";
import clsx from "clsx";
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "../Style";

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={clsx(classes.listDrewer, {
        [classes.fullListDrewer]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button component="a" href="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component="a" href="/addpost">
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Post" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <IconButton
              edge="start"
              className={classes.menuButtonDrewer}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Fab, Link } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1rem",
    marginLeft: "1rem",
    position: "fixed",
    bottom: 0,
    zIndex: 9000,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <Link href="/addPost">
      <div className={classes.root}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </Link>
  );
}

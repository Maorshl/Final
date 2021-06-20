import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Link from "@material-ui/core/Link";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1rem",
    marginLeft: "1rem",
    position: "fixed",
    bottom: 0,
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

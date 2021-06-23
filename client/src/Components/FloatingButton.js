import React from "react";
import { Fab, Link } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "../Style";

export default function FloatingActionButtons() {
  const classes = useStyles();

  return (
    <Link href="/addPost">
      <div className={classes.rootFloating}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </Link>
  );
}

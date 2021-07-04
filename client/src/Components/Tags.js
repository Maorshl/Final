import React from "react";
import { Chip, Paper } from "@material-ui/core";
import useStyles from "../Style/index";

//* This component renders the post tags, and handle if one is deleted

function Tags({ tags, setPostTags }) {
  const classes = useStyles();

  const handleDelete = (tagToDelete) => () => {
    setPostTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };
  return (
    <Paper component="ul" className={classes.rootTags}>
      {tags.map((tag, i) => {
        return (
          <li key={i}>
            <Chip
              label={tag}
              onDelete={handleDelete(tag)}
              className={classes.chipTags}
            />
          </li>
        );
      })}
    </Paper>
  );
}

export default Tags;

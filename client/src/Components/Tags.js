import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Chip, Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

//* This component renders the post tags, and handle if one is deleted

function Tags({ tags, setPostTags }) {
  const classes = useStyles();

  const handleDelete = tagToDelete => () => {
    setPostTags(tags => tags.filter(tag => tag !== tagToDelete));
  };
  return (
    <Paper component="ul" className={classes.root}>
      {tags.map((tag, i) => {
        return (
          <li key={i}>
            <Chip
              label={tag}
              onDelete={handleDelete(tag)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </Paper>
  );
}

export default Tags;

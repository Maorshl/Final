import axios from "axios";
import React, { useState, useRef } from "react";
import Cookies from "js-cookie";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Input } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tags from "./Tags";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    marginTop: "5rem",
    marginLeft: "45%",
    margin: "auto",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
  },
  descriptionContainer: {
    width: "1000px",
  },
}));

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

function AddPost() {
  const tagInput = useRef();
  const [postUrl, setUrl] = useState(undefined);
  const [postTitle, setTitle] = useState(undefined);
  const [postDescription, setDescription] = useState(undefined);
  const [postTags, setPostTags] = useState([]);
  const [tag, setTag] = useState("");
  const [postPrivate, setPrivate] = useState(false);
  const postAuthor = Cookies.get("userName");
  const postDate = new Date();
  const classes = useStyles();

  const addPost = () => {
    axios
      .post("http://localhost:8080/post/create", {
        title: postTitle,
        url: postUrl,
        description: postDescription,
        private: postPrivate,
        createdAt: postDate,
        author: postAuthor,
        tags: postTags,
        rating: 0,
      })
      .then(result => {
        console.log(result);
      });
  };
  const setPostUrl = event => {
    setUrl(event.target.value);
  };
  const setPostTitle = event => {
    setTitle(event.target.value);
  };
  const setPostDescription = event => {
    setDescription(event.target.value);
  };
  const getTags = event => {
    //* This function get the value of the input, set it as varibale of tag with useState.
    setTag(event.target.value);
  };
  const setTags = () => {
    //* This function takes each last tag of the input and add it to the tags array, and make sure that there is no duplicates in post tags
    if (tagInput.current.value === "") return;
    if (postTags.find(element => element === tagInput.current.value)) {
      tagInput.current.value = "";
      tagInput.current.focus();
      return;
    }
    setPostTags([...postTags, tag]);
    tagInput.current.value = "";
    tagInput.current.focus();
  };
  const changePostPrivate = () => {
    setPrivate(!postPrivate);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.inputContainer}>
          <FormControl>
            <InputLabel htmlFor="my-input">Post URL</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              onChange={setPostUrl}
              className={classes.input}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <FormControl>
            <InputLabel htmlFor="my-input">Post Title</InputLabel>
            <Input aria-describedby="my-helper-text" onChange={setPostTitle} />
          </FormControl>
          <FormGroup>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>
                  <AntSwitch
                    checked={postPrivate}
                    onChange={changePostPrivate}
                    name="checkedC"
                  />
                </Grid>
                <Grid item>Private</Grid>
              </Grid>
            </Typography>
          </FormGroup>
        </Grid>
        <Grid item xs={12} className={classes.descriptionContainer}>
          <FormGroup>
            <FormControl>
              <TextField
                id="outlined-multiline-static"
                label="Post description"
                multiline
                rows={4}
                variant="outlined"
                onChange={setPostDescription}
              />
            </FormControl>
          </FormGroup>
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <FormControl>
            <InputLabel htmlFor="my-input">Post Tags</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              onChange={getTags}
              className={classes.input}
              inputRef={tagInput}
            />
          </FormControl>
          <Button onClick={setTags} variant="contained" color="primary">
            Add Tag
          </Button>
        </Grid>
      </Grid>

      <Tags tags={postTags} setPostTags={setPostTags} tagInput={tagInput} />

      <Button onClick={addPost} variant="contained" color="primary">
        Add Post
      </Button>
    </div>
  );
}

export default AddPost;

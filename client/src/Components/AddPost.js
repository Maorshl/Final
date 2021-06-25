import axios from "axios";
import React, { useState, useRef } from "react";
import Cookies from "js-cookie";
import validator from "validator";
import Tags from "./Tags";
import AppBar from "./AppBar";
import useStyles from "../Style";
import AntSwitch from "../Style/AntSwitch";
import {
  Grid,
  Input,
  FormControl,
  InputLabel,
  Link,
  TextField,
  Button,
  Typography,
  FormGroup,
} from "@material-ui/core";

function AddPost({ setUser }) {
  const tagInput = useRef();
  const classes = useStyles();
  const [postUrl, setUrl] = useState(null);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [postTitle, setTitle] = useState(null);
  const [postDescription, setDescription] = useState(null);
  const [postTags, setPostTags] = useState([]);
  const [tag, setTag] = useState("");
  const [postPrivate, setPrivate] = useState(false);
  const [buttonColor, setButtonColor] = useState("null");
  const postAuthor = Cookies.get("userName");

  const addPost = () => {
    if (!isValidUrl) return;
    axios
      .post("http://localhost:8080/post/create", {
        title: postTitle,
        url: postUrl,
        description: postDescription,
        private: postPrivate,
        createdAt: new Date(),
        author: postAuthor,
        tags: postTags,
        rating: 0,
        rateAVG: 0,
        raters: [],
      })
      .then(result => {
        //* When the server done with the post request the client move back to the home page.
        if (result.status === 200) window.location = "/";
      });
  };
  const setPostUrl = event => {
    if (validator.isURL(event.target.value)) {
      setButtonColor("primary");
      setIsValidUrl(true);
      setUrl(event.target.value);
    } else {
      setButtonColor("null");
      setIsValidUrl(false);
    }
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
    <>
      <AppBar setUser={setUser} />
      <div className={classes.container}>
        <Typography variant="h4" color="primary">
          Add Post
        </Typography>
        <Grid item xs={12} className={classes.inputContainer}>
          <FormControl>
            <InputLabel htmlFor="my-input">Post URL</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              onChange={setPostUrl}
              className={classes.input}
              type="url"
              required="true"
              name="url"
            />
            {!isValidUrl && (
              <Typography variant="h6" color="primary">
                Please enter valid URL
              </Typography>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <FormControl>
            <InputLabel htmlFor="my-input">Post Title</InputLabel>
            <Input aria-describedby="my-helper-text" onChange={setPostTitle} />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
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
          <FormControl style={{ width: "70%" }}>
            <InputLabel htmlFor="my-input">Post Tags</InputLabel>
            <Input
              aria-describedby="my-helper-text"
              onChange={getTags}
              className={classes.input}
              inputRef={tagInput}
            />
          </FormControl>
          <Button
            style={{ width: "30%", fontSize: "10px", marginLeft: 0 }}
            onClick={setTags}
            variant="contained"
            color="primary"
          >
            Add Tag
          </Button>
        </Grid>
        <Tags tags={postTags} setPostTags={setPostTags} tagInput={tagInput} />

        <FormGroup style={{ marginBottom: "1rem", marginLeft: "1rem" }}>
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

        <Button
          style={{
            marginRight: "1rem",
            fontSize: "20px",
            marginLeft: "1rem",
            marginBottom: "1rem",
          }}
          onClick={addPost}
          variant="contained"
          color={buttonColor}
        >
          Add Post
        </Button>
      </div>
      <Copyright />
    </>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="initial" align="center">
      {"Copyright © "}
      <Link
        target="_blank"
        color="inherit"
        href="https://www.linkedin.com/in/maor-shlomo-27a8931bb/"
      >
        Maor Shlomo
      </Link>{" "}
      {"& "}
      <Link
        target="_blank"
        color="inherit"
        href="https://www.linkedin.com/in/gil-naaman-518738203/"
      >
        Gil Naaman
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default AddPost;

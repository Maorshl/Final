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
  Switch,
} from "@material-ui/core";
import xss from "xss";

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

  const addPost = async () => {
    if (!isValidUrl) return;
    const response = await axios.post("http://localhost:8080/post/create", {
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
    });
    //* When the server is done with the post request the client move back to the home page.
    if (response.status === 200) window.location = "/";
  };

  //* Only if the URL is valid, the user can submit the post.
  const setPostUrl = (event) => {
    if (validator.isURL(event.target.value)) {
      setButtonColor("primary");
      setIsValidUrl(true);
      setUrl(event.target.value);
    } else {
      setButtonColor("null");
      setIsValidUrl(false);
    }
  };
  const setPostTitle = (event) => {
    const safeInput = xss(event.target.value);
    setTitle(safeInput);
  };
  const setPostDescription = (event) => {
    const safeInput = xss(event.target.value);
    setDescription(safeInput);
  };
  const getTags = (event) => {
    //* This function get the value of the input, set it as variable of tag with useState.
    //* Make each tag capital letter
    function capitalizeFirstLetter() {
      const safeInput = xss(event.target.value);
      return safeInput.charAt(0).toUpperCase() + safeInput.slice(1);
    }
    setTag(capitalizeFirstLetter());
  };
  const setTags = () => {
    //* This function takes each last tag of the input and add it to the tags array, and make sure that there is no duplicates tags.
    if (tagInput.current.value === "") return;
    if (postTags.find((element) => element === tag)) {
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
        <Typography variant="h4" color="primary" data-testId="AddPost">
          Add Post
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.inputContainer}>
            <FormControl id="form-control">
              <InputLabel htmlFor="my-input">Post URL</InputLabel>
              <Input
                id="add-post-input"
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
            <FormControl id="form-control">
              <InputLabel htmlFor="my-input">Post Title</InputLabel>
              <Input
                aria-describedby="my-helper-text"
                id="add-post-input"
                onChange={setPostTitle}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.inputContainer}>
            <FormControl id="form-control">
              <TextField
                id="outlined-multiline-static"
                label="Post description"
                multiline
                rows={4}
                variant="outlined"
                onChange={setPostDescription}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} className={classes.inputContainer}>
            <FormControl style={{ width: "70%" }} id="form-control">
              <InputLabel htmlFor="my-input">Post Tags</InputLabel>
              <Input
                id="add-post-input"
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
        </Grid>
        <Tags tags={postTags} setPostTags={setPostTags} tagInput={tagInput} />

        <FormGroup style={{ marginBottom: "1rem", marginLeft: "1rem" }}>
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>
                <Switch
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

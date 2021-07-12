import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import AppBar from "./AppBar";
import useStyles from "../Style";
import Tags from "./Tags";
import { useParams } from "react-router-dom";
import {
  Grid,
  Input,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Typography,
  FormGroup,
} from "@material-ui/core";

function EditPost({ setUser }) {
  const { id } = useParams();
  const classes = useStyles();
  const tagInput = useRef();

  const [postTitle, setTitle] = useState(null);
  const [postDescription, setDescription] = useState(null);
  const [postTags, setPostTags] = useState([]);
  const [tag, setTag] = useState("");

  const getTags = (event) => {
    //* This function get the value of the input, set it as variable of tag with useState.
    //* Make each tag capital letter
    function capitalizeFirstLetter() {
      return (
        event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
      );
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

  const setPostTitle = (event) => {
    setTitle(event.target.value);
  };
  const setPostDescription = (event) => {
    setDescription(event.target.value);
  };
  async function getData() {
    const post = await getPost();
    setTitle(post.title);
    setDescription(post.description);
    setPostTags(post.tags);
  }

  const savePost = async () => {
    const { data } = await axios.patch(
      "http://ec2-3-80-252-156.compute-1.amazonaws.com:8080/post/edit",
      {
        id,
        title: postTitle,
        description: postDescription,
        tags: postTags,
      }
    );
    if (data === "Updated") return (window.location = "/myPosts/#!");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AppBar setUser={setUser} />
      <div className={classes.container}>
        <Typography variant="h4" color="primary">
          Edit Post
        </Typography>
        <Grid item xs={12} className={classes.inputContainer}>
          <FormControl>
            <Input
              placeholder="Post Title"
              aria-describedby="my-helper-text"
              onChange={setPostTitle}
              value={postTitle}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} className={classes.inputContainer}>
          <FormGroup>
            <FormControl>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="Post Description"
                variant="outlined"
                onChange={setPostDescription}
                value={postDescription}
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

        <Button
          style={{
            marginRight: "1rem",
            fontSize: "20px",
            marginLeft: "1rem",
            marginBottom: "1rem",
          }}
          variant="contained"
          color={"primary"}
          onClick={savePost}
        >
          Save
        </Button>
      </div>
    </>
  );
  async function getPost() {
    const { data } = await axios.get(
      `http://ec2-3-80-252-156.compute-1.amazonaws.com:8080/post/getonepostbyid?id=${id}`
    );
    return data;
  }
}
export default EditPost;

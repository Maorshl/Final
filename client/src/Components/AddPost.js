import axios from "axios";
import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@material-ui/core";

function AddPost(user) {
  const [postUrl, setPost] = useState(undefined);
  const [postTitle, setTitle] = useState(undefined);
  const [postDescription, setcontent] = useState(undefined);
  const [postTags, setTags] = useState([]);
  const [postRating, setRating] = useState(0);
  const [postPrivate, setPrivate] = useState(false);
  //   const postAuthor = user.userName;
  const postDate = new Date();

  const addPost = async () => {
    axios.post("/post/create", {});
  };

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
    </div>
  );
}

export default AddPost;

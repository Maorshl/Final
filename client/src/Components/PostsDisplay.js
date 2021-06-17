import axios from "axios";
import PostCard from "./PostCard";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function PostsDisplay(props) {
  const classes = useStyles();
  const [savedPosts, setSavedPosts] = useState([]);
  const [highRatedPosts, setHighRatedPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  useEffect(() => {
    (async function getPosts() {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setSavedPosts(data);
      setHighRatedPosts(data);
      setPrivatePosts(data);
    })();
  });
  return (
    <>
      <Typography>DisplayPosts</Typography>
      {/* <div className={classes.root}>
        <Typography>Saved Posts</Typography>
        <div className="post-display">
          {savedPosts.map((post, i) => {
            return <PostCard post={post} key={i} />;
          })}
        </div> */}

      {/* <Typography>High Rated Posts</Typography>
        <div className="post-display">
          {highRatedPosts.map((post, i) => {
            return <PostCard post={post} key={i} />;
          })}
        </div>

        <Typography>Private Posts</Typography>
        <div className="post-display">
          {privatePosts.map((post, i) => {
            return <PostCard post={post} key={i} />;
          })}
        </div> */}
      {/* </div> */}
    </>
  );
}

export default PostsDisplay;

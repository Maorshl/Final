import axios from "axios";
import PostCard from "./PostCard";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",

    backgroundColor: "#333",
    height: "91vh",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 0,
  },
}));

function PostsDisplay(props) {
  const classes = useStyles();
  const [savedPosts, setSavedPosts] = useState([]);
  const [highRatedPosts, setHighRatedPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  useEffect(() => {
    (async function getPosts() {
      const { data } = await axios.get("http://localhost:8080/post/");
      setSavedPosts(data);
      setHighRatedPosts(data);
      setPrivatePosts(data);
    })();
  }, []);
  return (
    <>
      <div className={classes.root}>
        <Typography variant="h2" color="primary">
          Feed
        </Typography>
        <div className={classes.flex}>
          <div className="post-scroll">
            <Typography>Saved Posts</Typography>
            {savedPosts &&
              savedPosts.map((post, i) => {
                return <PostCard post={post} key={i} />;
              })}
          </div>

          <div className="post-scroll">
            <Typography>High Rated Posts</Typography>
            {highRatedPosts &&
              highRatedPosts.map((post, i) => {
                return <PostCard post={post} key={i} />;
              })}
          </div>

          <div className="post-scroll">
            <Typography>Private Posts</Typography>
            {privatePosts &&
              privatePosts.map((post, i) => {
                return <PostCard post={post} key={i} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostsDisplay;

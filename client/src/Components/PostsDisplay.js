import axios from "axios";
import PostCard from "./PostCard";
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",

    backgroundColor: "#333",
    height: "100vh",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 0,
  },
  posts: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "fit-content",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function PostsDisplay() {
  const postsDiv = useRef();
  const classes = useStyles();
  const [savedPosts, setSavedPosts] = useState([]);
  const [highRatedPosts, setHighRatedPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const [morePosts, setMorePosts] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/post/getFew?pageNum=${pageNum}`
      );
      if (data === "No more posts") {
        setLoading(false);
        setMorePosts(false);
        return;
      }
      if (pageNum === 1) {
        setLoading(false);
        return setPosts(data);
      }
      setPosts([...posts, ...data]);
      setLoading(false);
    };
    getData();
  }, [pageNum]);

  window.onscroll = () => {
    if (postsDiv.current.getBoundingClientRect().bottom <= window.innerHeight)
      setPageNum(prevPageNum => prevPageNum + 1);
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h2" color="primary">
          Feed
        </Typography>
        <div className={classes.posts} ref={postsDiv}>
          {posts &&
            posts.map((post, i) => {
              return <PostCard post={post} key={i} />;
            })}
          {loading && (
            <div className={classes.spinner}>
              <CircularProgress color="secondary" />
            </div>
          )}
          {!morePosts && (
            <Typography variant="h6" color="primary">
              No more posts to show! come back later :)
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}

export default PostsDisplay;

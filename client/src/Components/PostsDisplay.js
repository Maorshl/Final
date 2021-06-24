import axios from "axios";
import PostCard from "./PostCard";
import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import useStyles from "../Style/index";

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
  const [latestPostTime, setLatestPostTime] = useState(undefined);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/post/getPosts?pageNum=${pageNum}&latestPost=${latestPostTime}`
      );
      if (data === "No more posts") {
        setLoading(false);
        setMorePosts(false);
        return;
      }
      setLatestPostTime(data[data.length - 1]);
      data.splice(data.length - 1, 1);
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
      setPageNum((prevPageNum) => prevPageNum + 1);
  };

  return (
    <>
      <div className={classes.rootPostDisplay}>
        <Typography variant="h2" color="primary">
          Feed
        </Typography>
        <div className={classes.postsPostDisplay} ref={postsDiv}>
          {posts &&
            posts.map((post, i) => {
              return <PostCard post={post} key={i} />;
            })}
          {loading && (
            <div className={classes.spinnerPostDisplay}>
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

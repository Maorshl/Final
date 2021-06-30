import axios from "axios";
import PostCard from "./PostCard";
import React, { useEffect, useState, useRef } from "react";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Search from "./Search";
import useStyles from "../Style/index";

function PostsDisplay() {
  const postsDiv = useRef();
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [viewPosts, setViewPosts] = useState([]);
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
        setViewPosts(data);
        return setPosts(data);
      }
      setViewPosts([...viewPosts, ...data]);
      setPosts([...posts, ...data]);
      setLoading(false);
    };
    getData();
  }, [pageNum]);

  //* Every time the user scrolled until the bottom of the div, it trigers this function and he ask for more posts.

  window.onscroll = () => {
    if (postsDiv.current.getBoundingClientRect().bottom <= window.innerHeight)
      setPageNum(prevPageNum => prevPageNum + 1);
  };

  return (
    <>
      <Search posts={posts} setViewPosts={setViewPosts} />

      <div className={classes.rootPostDisplay}>
        <Typography variant="h2" color="primary">
          Feed
        </Typography>
        <div className={classes.postsPostDisplay} ref={postsDiv}>
          {viewPosts &&
            viewPosts.map((post, i) => {
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

import axios from "axios";
import PostCard from "./PostCard";
import React, { useEffect, useState } from "react";
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
  spinner: {
    display: "flex",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function PostsDisplay(props) {
  const classes = useStyles();
  const [savedPosts, setSavedPosts] = useState([]);
  const [highRatedPosts, setHighRatedPosts] = useState([]);
  const [privatePosts, setPrivatePosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   (async function getPosts() {
  //     const { data } = await axios.get("http://localhost:8080/post/");
  //     setSavedPosts(data);
  //     setHighRatedPosts(data);
  //     setPrivatePosts(data);
  //   })();
  // }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/post/getFew?pageNum=${pageNum}`
      );
      if (data === "No more posts") {
        setLoading(false);
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

  function scrollToEnd() {
    setPageNum(pageNum + 1);
  }

  window.onscroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      scrollToEnd();
    }
  };

  return (
    <>
      <div className={classes.root}>
        <Typography variant="h2" color="primary">
          Feed
        </Typography>

        {posts &&
          posts.map((post, i) => {
            return <PostCard post={post} key={i} />;
          })}
        {loading && (
          <div className={classes.spinner}>
            <CircularProgress />
            <CircularProgress color="secondary" />
          </div>
        )}
      </div>
    </>
  );
}

export default PostsDisplay;

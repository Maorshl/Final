import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AppBar from "./AppBar";
import PostCard from "./PostCard";
import { Typography } from "@material-ui/core";

function MyPosts({ setUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async function () {
      const privatePosts = await getPrivatePosts();
      setPosts(privatePosts);
      console.log(privatePosts);
    })();
  }, []);

  return (
    <div>
      <AppBar setUser={setUser} />
      <Typography variant="h2" color="primary">
        My Posts
      </Typography>
      {posts &&
        posts.map((post) => {
          return <PostCard post={post} />;
        })}
    </div>
  );
}

async function getPrivatePosts() {
  const userName = Cookies.get("userName");
  const { data } = await axios.get(
    `http://localhost:8080/post/${userName}/private`
  );
  return data;
}
export default MyPosts;

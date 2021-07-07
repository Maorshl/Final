import axios from "axios";
import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import PostCard from "./PostCard";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

function MyPosts({ setUser }) {
  const { id } = useParams();
  const [posts, setPosts] = useState(null);

  async function getData() {
    const privatePosts = await getPost();
    setPosts(privatePosts);
    console.log(privatePosts);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AppBar setUser={setUser} />
      {posts && (
        <Typography variant="h2" color="primary">
          Post by: {posts.author}
        </Typography>
      )}
      {posts && <PostCard post={posts} />}
    </div>
  );

  async function getPost() {
    const { data } = await axios.get(
      `http://localhost:8080/post/getonepostbyid?id=${id}`
    );
    return data;
  }
}

export default MyPosts;

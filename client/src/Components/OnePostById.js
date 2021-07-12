import axios from "axios";
import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import PostCard from "./PostCard";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

function MyPosts({ setUser }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  async function getData() {
    const onePost = await getPost();
    setPost(onePost);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AppBar setUser={setUser} />
      {post && (
        <Typography variant="h2" color="primary">
          Post by: {post.author}
        </Typography>
      )}
      {post && <PostCard post={post} />}
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

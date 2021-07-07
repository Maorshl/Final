import axios from "axios";
import React, { useEffect, useState, useParams } from "react";
import Cookies from "js-cookie";
import AppBar from "./AppBar";
import PostCard from "./PostCard";
import { Typography } from "@material-ui/core";
import Search from "./Search";
import Pagination from "./Pagination";

function MyPosts({ setUser }) {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showRefresh, setShowRefresh] = useState(false);
  //* For paginate

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const correctPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const search = () => {
    //* If no data to search => return
    if ((!searchFilter && !searchText) || (searchText && !searchFilter)) return;
    if (!searchText && searchFilter) {
      setSearchFilter("");
      setShowRefresh(false);
    }
    getData();
  };

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
      <Typography variant="h2" color="primary">
        {posts.title}
      </Typography>
      <PostCard post={posts} />;
    </div>
  );

  async function getPost() {
    const { data } = await axios.get(
      `http://localhost:8080/post/getonepostbyid?id=${id}`,
      {}
    );
    return data;
  }
}

export default MyPosts;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AppBar from "./AppBar";
import PostCard from "./PostCard";
import { Typography } from "@material-ui/core";
import Search from "./Search";
import Pagination from "./Pagination";

function MyPosts({ setUser }) {
  const [posts, setPosts] = useState([]);
  const [searchFilter, setSearchfilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showRefresh, setShowRefresh] = useState(false);
  //* For paginate
  const [currectPage, setCurrectPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currectPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const correctPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => {
    setCurrectPage(pageNumber);
  };

  const serach = () => {
    //* If no data to search => retrun
    if ((!searchFilter && !searchText) || (searchText && !searchFilter)) return;
    if (!searchText && searchFilter) {
      setSearchfilter("");
      setShowRefresh(false);
    }
    getData();
  };
  async function getData() {
    const privatePosts = await getPrivatePosts(searchFilter, searchText);
    setPosts(privatePosts);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AppBar setUser={setUser} />
      <Typography variant="h2" color="primary">
        My Posts
      </Typography>
      <Search
        setSearchfilter={setSearchfilter}
        setSearchText={setSearchText}
        searchFilter={searchFilter}
        serach={serach}
        searchText={searchText}
        showRefresh={showRefresh}
        setShowRefresh={setShowRefresh}
      />
      {correctPost &&
        correctPost.map(post => {
          return <PostCard post={post} />;
        })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

async function getPrivatePosts(searchFilter, searchText) {
  const userName = Cookies.get("userName");
  const { data } = await axios.get(
    `http://localhost:8080/post/private?userName=${userName}&searchFilter=${searchFilter}&searchText=${searchText}`
  );
  return data;
}
export default MyPosts;

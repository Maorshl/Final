import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import AppBar from "./AppBar";
import PostCard from "./PostCard";
import { Typography } from "@material-ui/core";
import Search from "./Search";

function MyPosts({ setUser }) {
  const [posts, setPosts] = useState([]);
  const [searchFilter, setSearchfilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showRefresh, setShowRefresh] = useState(false);

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
        Saved Posts
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
      {posts &&
        posts.map(post => {
          return <PostCard post={post} />;
        })}
    </div>
  );
}

async function getPrivatePosts(searchFilter, searchText) {
  const userName = Cookies.get("userName");
  const { data } = await axios.get(
    `http://localhost:8080/post/savedposts?userName=${userName}&searchFilter=${searchFilter}&searchText=${searchText}`,
    {}
  );
  return data;
}
export default MyPosts;

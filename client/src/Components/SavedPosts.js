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
  const [searchFilter, setSearchFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showRefresh, setShowRefresh] = useState(false);
  //* For paginate

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const correctPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const search = () => {
    //* If no data to search => return
    if ((!searchFilter && !searchText) || (searchText && !searchFilter)) return;
    if (!searchText && searchFilter) {
      setSearchFilter("");
      setShowRefresh(false);
    }
    //* After search the => reset the posts array.
    setPosts([]);
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
        setSearchFilter={setSearchFilter}
        setSearchText={setSearchText}
        searchFilter={searchFilter}
        search={search}
        searchText={searchText}
        showRefresh={showRefresh}
        setShowRefresh={setShowRefresh}
      />
      {correctPosts &&
        correctPosts.map(post => {
          return <PostCard post={post} />;
        })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        fromPage={"savedposts"}
      />
    </div>
  );
}

async function getPrivatePosts(searchFilter, searchText) {
  const userName = Cookies.get("userName");
  const { data } = await axios.get(
    `http://ec2-3-80-252-156.compute-1.amazonaws.com:8080/post/savedposts?userName=${userName}&searchFilter=${searchFilter}&searchText=${searchText}`,
    {}
  );
  return data;
}
export default MyPosts;

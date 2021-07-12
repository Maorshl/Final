import axios from "axios";
import React, { useEffect, useState } from "react";
import AppBar from "./AppBar";
import PostCard from "./PostCard";
import { Typography } from "@material-ui/core";
import Search from "./Search";
import Pagination from "./Pagination";
import FollowTag from "./FollowTag";
import { useParams } from "react-router-dom";

function MyPosts({ setUser }) {
  const [posts, setPosts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showRefresh, setShowRefresh] = useState(false);
  let { tag } = useParams();
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
    const privatePosts = await getPostsByTag(searchFilter, searchText);
    setPosts(privatePosts);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <AppBar setUser={setUser} />
      <Typography variant="h2" color="primary">
        {tag} Posts
      </Typography>
      <FollowTag tag={tag} />
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
        correctPosts.map((post) => {
          return <PostCard post={post} />;
        })}
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        fromPage={`${tag}`}
      />
    </div>
  );
  async function getPostsByTag(searchFilter, searchText) {
    const { data } = await axios.get(
      `http://localhost:8080/post/postByTag?tag=${tag}&searchFilter=${searchFilter}&searchText=${searchText}`
    );
    return data;
  }
}

export default MyPosts;

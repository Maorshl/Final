import React from "react";
import AppBar from "./AppBar";

function MyPosts({ setUser }) {
  return (
    <div>
      <AppBar setUser={setUser} />
    </div>
  );
}

export default MyPosts;

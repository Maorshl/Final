import React from "react";

import AppBar from "./AppBar";
import FloatingButton from "./FloatingButton";
import PostsDisplay from "./PostsDisplay";
import Search from "./Search";

function Welcome({ setUser }) {
  return (
    <div>
      <AppBar setUser={setUser} />

      <div className="left-down-corner">
        <FloatingButton />
        {/* <Search /> */}
        <PostsDisplay />
      </div>
    </div>
  );
}

export default Welcome;

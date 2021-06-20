import { Typography } from "@material-ui/core";
import React from "react";

import AppBar from "./AppBar";
import FloatingButton from "./FloatingButton";
import PostsDisplay from "./PostsDisplay";

function Welcome({ setUser }) {
  return (
    <div>
      <AppBar setUser={setUser} />

      <div className="left-down-corner">
        <FloatingButton />
        <PostsDisplay />
      </div>
    </div>
  );
}

export default Welcome;

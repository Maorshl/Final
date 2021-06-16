import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
function Welcome() {
  return (
    <Link to="/addPost">
      <Button variant="contained" color="primary" id="add-post-button">
        Add Post
      </Button>
    </Link>
  );
}

export default Welcome;

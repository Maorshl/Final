import React from "react";
import StyledMenuItem from "../Style/StyledMenuItem";
import ListItemText from "@material-ui/core/ListItemText";

function Notifications({ notification }) {
  return (
    <StyledMenuItem>
      <ListItemText primary={"notification.post.title"} secondary={"tag"} />
    </StyledMenuItem>
  );
}

export default Notifications;

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import StyledMenuItem from "../Style/StyledMenuItem";
import StyledMenu from "../Style/StyledMenu";

function Search() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchFilter, setSearchfilter] = useState(undefined);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Search By : {searchFilter}
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Title"
            onClick={() => {
              setSearchfilter("Title");
              handleClose();
            }}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Content"
            onClick={() => {
              setSearchfilter("Content");
              handleClose();
            }}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Tags"
            onClick={() => {
              setSearchfilter("Tags");
              handleClose();
            }}
          />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default Search;

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import StyledMenuItem from "../Style/StyledMenuItem";
import StyledMenu from "../Style/StyledMenu";
import { FormControl, TextField } from "@material-ui/core";

function Search({ posts, setPosts }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchFilter, setSearchfilter] = useState("");
  const [searchText, setSearchText] = useState(undefined);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterPosts = () => {
    posts.forEach(post => {
      console.log(post[searchFilter] && post[searchFilter].toLowerCase());
    });

    // const filterPostsList = posts.filter(post =>
    //   post[searchFilter].toLowerCase().includes(searchText)
    // );
    // console.log(filterPostsList);
  };
  const setText = event => {
    setSearchText(event.target.value.toLowerCase());
    filterPosts();
  };
  return (
    <div className="search">
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
              setSearchfilter("title");
              handleClose();
            }}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary="Description"
            onClick={() => {
              setSearchfilter("description");
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
      <div className="search-input">
        <FormControl>
          <TextField
            id="outlined-multiline-static"
            label="Search post"
            multiline
            rows={1}
            variant="outlined"
            onChange={setText}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default Search;

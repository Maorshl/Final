import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import StyledMenuItem from "../Style/StyledMenuItem";
import StyledMenu from "../Style/StyledMenu";
import { FormControl, TextField } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

function Search({
  setSearchfilter,
  setSearchText,
  searchFilter,
  serach,
  searchText,
  showRefresh,
  setShowRefresh,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonColor, setButtonColor] = useState("null");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //* This use effect set the button icon and color, by the logic of the search.

  useEffect(() => {
    //* If there is text and filter => normal search
    if (searchText && searchFilter) {
      setButtonColor("primary");
      setShowRefresh(false);
    } else if (!searchText && searchFilter) {
      //* If only filter=> the user can refresh the feed
      setShowRefresh(true);
      setButtonColor("primary");
    } else {
      //* Else => cant do anything
      setButtonColor("null");
    }
  }, [searchText, searchFilter]);

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
              setSearchfilter("tags");
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
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </FormControl>
        <Button
          className="serach-button"
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color={buttonColor}
          onClick={() => serach()}
        >
          {/* Set icon by show refresh  */}
          {showRefresh ? <RefreshIcon /> : <SearchIcon />}
        </Button>
      </div>
    </div>
  );
}

export default Search;

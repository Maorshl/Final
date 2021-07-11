import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import useStyles from "../Style";
import { CardActions, IconButton } from "@material-ui/core";
import { Link, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
const userName = Cookies.get("userName");

//* This component is used to handle all of postCard actions.

function CardAct({ post }) {
  const classes = useStyles();
  const [isRated, setIsRated] = useState(false);
  const [rateValue, setRateValue] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(post.likes.length);

  useEffect(() => {
    const currentUser = Cookies.get("userName");
    if (post.likes.includes(currentUser)) {
      setLiked(true);
    }
    //* To know if user rated this post
    const getRaters = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/rating/isRated?id=${post._id}&userName=${userName}`
      );
      setIsRated(data);
    };
    //* Set each post his AVG rate
    const getAVGRateData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/rating/getRate?id=${post._id}`
      );
      setRateValue(data.AVG);
    };
    getRaters();
    getAVGRateData();
  }, []);

  const setPostRate = async (rate) => {
    const { data } = await axios.post("http://localhost:8080/rating/ratePost", {
      postId: post._id,
      userName,
      rate,
    });
    setIsRated(true);
    setRateValue(data.averageRate);
  };

  return (
    <div>
      {/*  //*If rated- marked as rated, if not, he can vote. */}
      <CardActions disableSpacing className={classes.cardActions}>
        {isRated ? (
          <CheckCircleOutlineIcon color="primary" />
        ) : (
          <Box component="fieldset" mb={3} borderColor="transparent">
            {!post.private && (
              <>
                <Typography component="legend">Rate this post!</Typography>
                <Rating
                  onChange={(event, newValue) => {
                    setPostRate(newValue);
                  }}
                  name={post._id}
                  defaultValue={0}
                  precision={0.5}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </>
            )}
          </Box>
        )}
        <IconButton aria-label="add to favorites">
          {liked ? (
            <BookmarkOutlinedIcon onClick={() => unlikeThePost(post._id)} />
          ) : (
            <BookmarkBorderOutlinedIcon onClick={() => likeThePost(post._id)} />
          )}
        </IconButton>

        {/* //* Link button to each post URL */}

        <Typography>{likesNumber} Likes</Typography>

        {/* //* Each post AVG rate */}
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          className={classes.AVGrate}
        >
          {/* //*Only public posts can rated */}
          {/* //*Only private posts can edited */}
          {!post.private ? (
            <>

              <Typography component="legend">Rating:</Typography>

              <Rating
                name="read-only"
                value={rateValue}
                readOnly
                precision={0.5}
              />
            </>
          ) : (
            <Button id="edit-button">
              <Link href={`/editPost/${post._id}`}>
                <EditIcon />
                Edit
              </Link>
            </Button>
          )}
        </Box>
      </CardActions>
    </div>
  );

  async function likeThePost(postId) {
    await axios.post("http://localhost:8080/user/save", { userName, postId });
    setLiked(true);
    setLikesNumber(likesNumber + 1);
  }
  async function unlikeThePost(postId) {
    await axios.patch("http://localhost:8080/user/removeFromSaved", {
      userName,
      postId,
    });
    setLiked(false);
    setLikesNumber(likesNumber - 1);
  }
}

export default CardAct;

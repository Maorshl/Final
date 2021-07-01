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
import FavoriteIcon from "@material-ui/icons/Favorite";
import LinkIcon from "@material-ui/icons/Link";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
const userName = Cookies.get("userName");

function CardAct({ post }) {
  const classes = useStyles();
  const [isRated, setIsRated] = useState(false);
  const [rateValue, setRateValue] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
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
    setRateValue(data.AVG);
  };

  return (
    <div>
      {/*  If rated- marked as rated, if not, he can vote. */}
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
        {/* <div onClick={() => likeThePost(post._id)}> */}
        <IconButton aria-label="add to favorites">
          {post.likes.includes(userName) ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderIcon onClick={() => likeThePost(post._id)} />
          )}
        </IconButton>
        {/* </div> */}
        {/*  Link button to each post URL */}
        {post.url && (
          <IconButton aria-label="share" href={`${post.url}`} target="_blank">
            <LinkIcon />
          </IconButton>
        )}
        {/*  Each post AVG rate */}
        <Box
          component="fieldset"
          mb={3}
          borderColor="transparent"
          className={classes.AVGrate}
        >
          {!post.private && (
            <>
              <Typography component="legend">AVG Rate:</Typography>
              <Rating
                name="read-only"
                value={rateValue}
                readOnly
                precision={0.5}
              />
            </>
          )}
        </Box>
      </CardActions>
    </div>
  );

  async function likeThePost(postId) {
    await axios.post("http://localhost:8080/user/save", { userName, postId });
    setLiked(true);
  }
}

export default CardAct;

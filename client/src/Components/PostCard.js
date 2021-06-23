import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import LinkIcon from "@material-ui/icons/Link";
import useStyles from "../Style";

export default function PostCard({ post }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.rootPostCard}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatarPostCard}>
            {post.author}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={new Date(post.createdAt).toLocaleDateString()}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {post.head && post.head}
        </Typography>
        <Typography variant="body3" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {post.url && (
          <IconButton
            aria-label="share"
            href={`https://${post.url}`}
            target="_blank"
          >
            <LinkIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

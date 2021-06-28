import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardAct from "./CardAct";
import useStyles from "../Style";

export default function PostCard({ post, id }) {
  const classes = useStyles();

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
      <CardAct id={id} post={post} />
    </Card>
  );
}

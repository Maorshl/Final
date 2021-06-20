const Post = require("../models/Post");
//* This variable is the value of the time of the last post that send to the client, so we can know from which time we should do the query from the DB.
let lastPostTime;

async function getPosts(query) {
  console.log(typeof query);
  if (query === "1") {
    try {
      //   const posts = await Post.find({}).sort({ createdAt: 1 }).limit(5);
      const posts = await Post.find({}).limit(5);
      return posts;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = getPosts;

const Post = require("../models/Post");
//* This variable is the value of the time of the last post that send to the client, so we can know from which time we should do the query from the DB.
let lastPostTime;

async function getPosts(query) {
  let posts;
  try {
    if (query === "1") {
      posts = await Post.find({}).sort({ createdAt: "desc" }).limit(5);
    } else {
      posts = await Post.find({
        createdAt: { $lt: new Date(lastPostTime) },
      })
        .sort({ createdAt: "desc" })
        .limit(5);
    }
    if (posts.length === 0) return "No more posts";

    lastPostTime = new Date(posts[posts.length - 1].createdAt);
    post = shuffleArray(posts);
    return posts;
  } catch (error) {
    console.log(error);
    return "error";
  }
}

const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

module.exports = getPosts;

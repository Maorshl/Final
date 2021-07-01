const Post = require("../models/Post");

//* This function send to each client list of post, with the date of the last post,
//* and every client send back the latest post time that he recived and now he can get older posts.

async function getPosts(pageNum, latestPost, searchFilter, searchText) {
  let posts;

  const text = new RegExp(searchText, "i");

  //* If search filter is undefined - set is default into title, only for mongoose that does the query.

  searchFilter ? searchFilter : (searchFilter = "title");

  try {
    if (pageNum === "1") {
      posts = await Post.find({
        private: false,
        $and: [{ [searchFilter]: text }],
      })
        .sort({ createdAt: "desc" })
        .limit(5);
    } else {
      posts = await Post.find({
        createdAt: { $lt: new Date(latestPost) },
        $and: [{ [searchFilter]: text }, { private: false }],
      })
        .sort({ createdAt: "desc" })
        .limit(5);
    }
    if (posts.length === 0) return "No more posts";
    const lastPostTime = new Date(posts[posts.length - 1].createdAt);
    post = shuffleArray(posts);
    posts.push(lastPostTime);
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

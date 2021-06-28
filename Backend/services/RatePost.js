const Post = require("../models/Post");

async function ratePost(postId, userName, rate) {
  if (userName == undefined) return;
  const post = await Post.findById(postId);
  rate = Number(rate);
  const voted = post.raters.length + 1; //* The list didnt updated yet with the current rate, so need to add one
  const updateRating = post.rating + rate;
  const averageRate = updateRating / voted;

  Post.findByIdAndUpdate(
    { _id: postId },
    {
      $inc: { rating: rate },
      $push: { raters: userName },
      rateAVG: averageRate,
    }
  ).then(result => {
    console.log(result);
  });
  return averageRate;
}

module.exports = ratePost;

const Post = require("../models/Post");

//* This function receive postID, the userName who rated the post, and his rate, calcs the new AVG, update, and send back the new AVG

async function ratePost(req, res) {
  let { postId, userName, rate } = req.body;

  const post = await Post.findById(postId);
  rate = Number(rate);
  //* The list didn't updated yet with the current rate, so need to add one
  const voted = post.raters.length + 1;
  const updateRating = post.rating + rate;
  const averageRate = updateRating / voted;

  Post.findByIdAndUpdate(
    { _id: postId },
    {
      $inc: { rating: rate },
      $push: { raters: userName },
      rateAVG: averageRate,
    }
  ).then(() => {
    res.send({ averageRate });
  });
}

module.exports = ratePost;

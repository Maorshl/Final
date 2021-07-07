const Post = require("../models/Post");

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
  ).then(result => {
    console.log(result);
  });
  res.send({ averageRate });
}

module.exports = ratePost;

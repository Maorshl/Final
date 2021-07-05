const Tag = require("../models/Tag");

async function followTag(req, res) {
  try {
    const { userName, tag } = req.body;
    await Tag.findOneAndUpdate(
      { name: tag },
      { $pull: { followers: userName } }
    );
    res.send("Tag UnFollowed").status(204);
  } catch (error) {
    res.send(error.message).status(500);
  }
}
module.exports = followTag;

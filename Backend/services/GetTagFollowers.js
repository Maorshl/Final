const Tag = require("../models/Tag");

async function getTagFollowers(req, res) {
  try {
    const { tag } = req.params;
    const tagData = await Tag.findOne({ name: tag });
    res.json(tagData.followers).status(204);
  } catch (error) {
    res.send(error.message).status(500);
  }
}
module.exports = getTagFollowers;

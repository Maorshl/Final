const Tag = require("../models/Tag");

//* This function recive array of tags that just writed in a posts, and create them in need.

async function createTag(tags) {
  tags.forEach(async tag => {
    const checkTag = await Tag.find({ name: tag });
    if (checkTag.length === 0) {
      const createNewTag = {
        name: tag,
        followers: [],
      };
      const newTag = new Tag(createNewTag);
      newTag.save();
    } else {
      console.log("exist");
    }
  });
}

module.exports = createTag;

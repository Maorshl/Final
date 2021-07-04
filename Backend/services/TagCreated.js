const Tag = require("../models/Tag");

//* This function recive array of tags that just writed in a posts, and create tag if need.
//* Else, add to array to send notifications, new tag dosent have followers..

async function createTag(tags) {
  const tagsToSend = [];
  const requests = tags.map(tag => {
    return new Promise(async resolve => {
      const checkTag = await Tag.find({ name: tag });
      if (checkTag.length === 0) {
        const createNewTag = {
          name: tag,
          followers: [],
        };
        const newTag = new Tag(createNewTag);
        newTag.save();
        resolve(tag);
      } else {
        tagsToSend.push(tag);
        resolve(tag);
      }
    });
  });
  Promise.all(requests).then(result => console.log(tagsToSend));
}

// function sendNofitication() {
//   allFollowers = [];
//   //* Get all followers into list.
//   tagsToSend.forEach(async tag => {
//     const eachTag = await Tag.find({ name: tag });
//     allFollowers.push(...eachTag[0].followers);
//   });
//   console.log(allFollowers);
// }

module.exports = createTag;

const Tag = require("../models/Tag");
const User = require("../models/User");

//* This function recive array of tags that just writed in a posts, and create tag if need.
//* Else, add to array to send notifications, new tag dosent have followers..

async function createTag(tags) {
  const tagsToSend = [];
  const requests = tags.map((tag) => {
    return new Promise(async (resolve) => {
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
  Promise.all(requests).then(() => getFollower(tagsToSend));
}

function getFollower(tagsToSend) {
  const allFollowers = [];
  //* Get all followers into list.
  const requests = tagsToSend.map((tag) => {
    return new Promise(async (resolve) => {
      const eachTag = await Tag.find({ name: tag });
      allFollowers.push(...eachTag[0].followers);
      resolve(tag);
    });
  });

  Promise.all(requests).then(() => {
    //* Make unique list, to prevent users get twice same notification on the same post.
    const uniqueFollowersList = [...new Set(allFollowers)];
    sendNotification(uniqueFollowersList);
  });
}

function sendNotification(followersList) {
  followersList.forEach((follower) => {
    User.findOneAndUpdate({ userName: follower });
  });
}

module.exports = createTag;

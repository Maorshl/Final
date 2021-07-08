const Tag = require("../models/Tag");
const User = require("../models/User");

///* This function runs AFTER the post is created, and take care to send notifications
//* This function receive post, and loop the array of tags that just written in a posts, and create tag if need.
//* Else, add to array to send notifications, new tag doesn't have followers..

function postCreated(post) {
  const tagsToSend = [];
  const requests = post.tags.map(tag => {
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
  //* Send the relevant tags
  Promise.all(requests).then(() => getFollower(post, tagsToSend));
}

function getFollower(post, tagsToSend) {
  const allFollowers = [];
  //* Get all followers into list.
  const requests = tagsToSend.map(tag => {
    return new Promise(async resolve => {
      const eachTag = await Tag.find({ name: tag });
      allFollowers.push(...eachTag[0].followers);
      resolve(tag);
    });
  });

  Promise.all(requests).then(() => {
    //* Make unique list, to prevent from users get twice notifications on the same post.
    const uniqueFollowersList = [...new Set(allFollowers)];
    //* Check if author is in the list, and if he does exist, delete him.
    const findIfAuthor = uniqueFollowersList.indexOf(post.author);
    if (findIfAuthor !== -1) {
      uniqueFollowersList.splice(findIfAuthor, 1);
    }
    sendNotification(post, uniqueFollowersList);
  });
}

function sendNotification(post, followersList) {
  const newNotification = [
    {
      createdAt: new Date(),
      read: false,
      post,
    },
  ];
  followersList.forEach(follower => {
    User.findOneAndUpdate(
      { userName: follower },
      { $push: { notifications: newNotification } }
    ).then(result => console.log(result));
  });
}

module.exports = postCreated;

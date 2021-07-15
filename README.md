# Smart Library 📚

## The app idea

Today there is a lot of places that you get links, sometimes on whatsapp, youtube or or any other website that you end-up in.
This app purpose is to provide a links organizing platform to add and save your links with easy and intuitive UI you can search for certain subjects, titles, or description, the app provides a built in scraping for links that you don't know how to describe and fetches the title of the specific link.

## About the app 💻

This app is a friendly way to organize all of your links to information at the web, and reach them easily.
In the feed you can see all the public posts, rate them, save them, and of course, go the URL.
In addition you can follow a tag, and receive notifications when someone else published a post with this tag

## How it works

- The app has its own authentication system using `JWT` `Bcrypt` and `MongoDB`
- When a user is publishing a post it is saved to `MongoDB` and sends a notification to relevant users
- When a user is bookmarking a post it pushes it to user saved posts and he can access it whenever he is interested at the "Saved Post" page.
- User can edit a private post that he shared and save the changes.

## Technologies

### Server <img src="./client/public/ReadMeFiles/NodeJS.png" alt="drawing" width="25" height="25"/>

- `Node.js`
- `Express.js`
- `MongoDB`
- `JSONWEBTOKEN`
- `Bcrypt`
- `Cheerio`

### Client ⚛️

- `React`
- `Material UI`
- `Axios`
- `Jest`

### Cloud ☁️

- `AWS ECS`
- `AWS EC2`
- `AWS Route53`
- `Docker`

## Features 🥁

### After you sign in you can view other user's posts or maybe add your own

![Main Page](./client/public/ReadMeFiles/Animation1.gif)

### If you follow a tag you will get notification whenever other user post a link with that tag

![Getting Notification](./client/public/ReadMeFiles/Animation2.gif)

### You can save and rate other user's posts

![Getting Notification](./client/public/ReadMeFiles/Animation3.gif)

## Take a look!

### The app is hosted on AWS try it out:

## [Smart-Library](http://app.smartlibrary.link)

<img src="./client/public/ReadMeFiles/ThankYou.gif" alt="drawing" width="200" height="200"/>

const mongoose = require("mongoose");
const { Schema } = mongoose;
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connected to MongoDB`);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const userSchema = new Schema({
  name: { first: String, last: String },
  privatePosts: Array,
  savedPosts: Array,
  timeUsing: Number,
});

module.exports = mongoose.model("User", userSchema);

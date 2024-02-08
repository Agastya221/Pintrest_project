import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
    }
  ],
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

export default Post;

import mongoose from 'mongoose';

const Post = new mongoose.Schema({
  author: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  title: { type: String, required: true },
  h1: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  headimg_dir: { type: String, required: true },
  files_dir: { type: Array },
});

// headimg_dir: u4() .

export default mongoose.model('Post', Post);

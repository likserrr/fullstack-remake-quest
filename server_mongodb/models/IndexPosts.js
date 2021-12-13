import mongoose from 'mongoose';

const IndexPosts = new mongoose.Schema({
  date_update: { type: Date, required: true, default: Date.now },
  feature_p: { type: String, required: true },
  blog_p: { type: Array, required: true },
  small_p: { type: Array, required: true },
});

export default mongoose.model('index_posts', IndexPosts);

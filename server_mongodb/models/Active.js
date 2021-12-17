import mongoose from 'mongoose';

const Active = new mongoose.Schema({
  author: { type: String, required: true },
  post_id: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: Date, required: true, default: Date.now },
});

export default mongoose.model('Active', Active);

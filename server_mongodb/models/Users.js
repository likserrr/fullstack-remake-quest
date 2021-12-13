import mongoose from 'mongoose';

const Users = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, required: true },
});

export default mongoose.model('Users', Users);

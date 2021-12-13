import Post from './models/Post.js';
import Users from './models/Users.js';
import Active from './models/Active.js';

import dotenv from 'dotenv';
dotenv.config();

class ServiceUtils {
  modifyPath(record, format = false) {
    if (record.headimg_dir) {
      record.headimg_dir =
        process.env.SERVER + 'img/blog/' + record.headimg_dir;
      if (format) {
        switch (format) {
          case 'feature':
            record.headimg_dir += '/head_755x350.jpg';
            break;
          case 'blog':
            record.headimg_dir += '/head_365x260.jpg';
            break;
          case 'small':
            record.headimg_dir += '/head_168x188.jpg';
            break;
          case 'sidebar':
            record.headimg_dir += '/head_88x88.jpg';
            break;
          default:
            console.log('Sorry, we are out of ' + format + '.');
        }
      }
    }
    if (record.avatar) {
      record = process.env.SERVER + 'img/users/' + record.avatar;
    }
    return record;
  }

  async getPostsArr(postsId, format) {
    const modPosts = await Promise.all(
      postsId.map(async (id) => {
        let post = await Post.findById(id);
        const comments = await Active.find({
          post_id: { $eq: id },
          comment: { $exists: true }, // Проверка, если есть лайки
        });
        post._doc.comments = comments.length;
        return post;
      }),
    );
    const modPath = modPosts.map((post) => this.modifyPath(post, format));
    return modPath;
  }

  async checkPost(id) {
    try {
      const post = await Post.findById(id).exec();
      return { status: true, ans: post };
    } catch (e) {
      if (e.name === 'CastError') {
        e.message = `Broken Id passed: '${id}'. Check correctness`;
      }
      return { status: false, ans: e.message };
    }
  }

  async checkUser(id) {
    try {
      const user = await Users.findById(id).exec();
      return { status: true, ans: user };
    } catch (e) {
      if (e.name === 'CastError') {
        e.message = `Broken Id passed: '${id}'. Check correctness`;
      }
      return { status: false, ans: e.message };
    }
  }
}

export default ServiceUtils;

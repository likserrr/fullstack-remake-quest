import Post from './models/Post.js';
import PostTemp from './models/PostCapped.js';
import IndexPosts from './models/IndexPosts.js';
import fileService from './fileService.js';
import dotenv from 'dotenv';
import Active from './models/Active.js';
import ServiceUtils from './ServiceUtils.js';
import { defaultErr, saveFilesErr } from './utils/errorHandler.js';
import Users from './models/Users.js';

import LoadPosts from './utils/start/LoadPosts.js';
import LoadUsers from './utils/start/LoadUsers.js';
import LoadActive from './utils/start/LoadActive.js';

dotenv.config();

class PostService extends ServiceUtils {
  async create(post, headImg) {
    let headImgDir = fileService.checkBlogDir();
    if (!headImgDir.status || !headImgDir.mes) {
      console.log(headImgDir.mes);
      throw new defaultErr(
        'Status 500. Error on the server',
        headImgDir.mes,
        'fatal',
      );
    }

    headImgDir = headImgDir.mes;
    console.log('path : ' + headImgDir);

    await PostTemp.create({ ...post, headimg_dir: headImgDir }).catch((err) => {
      if (err) throw new defaultErr(err.message);
    });

    await fileService.saveHeadImg(headImgDir, headImg).catch((e) => {
      if (e.name === 'SaveFilesError') {
        throw e;
      } else
        throw new defaultErr(
          'Unexpected error when loading attachments on the server',
          'SaveFileErr: ' + e.message,
          'fatal',
        );
    });

    const createdPost = await Post.create({
      ...post,
      headimg_dir: headImgDir,
    }).catch((err) => {
      if (err)
        throw new saveFilesErr(headImgDir, err.message, true, err.message);
    });

    return this.modifyPath(createdPost);
  }

  async getIndexPosts() {
    let posts = await IndexPosts.find().limit(1).sort({ $natural: -1 });
    posts = posts[0];

    posts.blog_p = await this.getPostsArr(posts.blog_p, 'blog');
    posts.small_p = await this.getPostsArr(posts.small_p, 'small');

    const featurePost = await Post.findById(posts.feature_p);
    const featureActive = await Active.find({
      post_id: { $eq: posts.feature_p },
      comment: { $exists: true },
    });
    featurePost._doc.comments = featureActive.length;

    posts._doc.feature_p = this.modifyPath(featurePost, 'feature');

    return posts;
  }

  async getBestPosts() {
    const posts = await Post.find().sort({ comments: -1 }).limit(5);
    return posts.map((item) => this.modifyPath(item, 'sidebar'));
  }

  async createActive(data, postId) {
    const checkPost = await this.checkPost(postId);
    if (!checkPost.status) {
      throw new defaultErr(checkPost.ans, checkPost.ans, 'info');
    }
    if (!checkPost.ans) {
      throw new defaultErr(`Post with id: ${postId} undefinded`);
    }

    const checkUser = await this.checkUser(data.author);
    if (!checkUser.status) {
      throw new defaultErr(checkUser.ans, checkUser.ans, 'info');
    }
    if (!checkUser.ans) {
      throw new defaultErr(`User with id: ${data.author} undefinded`);
    }

    const createdActive = await Active.create({
      author: data.author,
      post_id: postId,
    }).catch((err) => {
      throw new defaultErr(
        `Unexpected error with loading active`,
        err.message,
        'fatal',
      );
    });

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $inc: { comments: 1 },
      },
      { strict: false, new: true },
    ).catch((err) => {
      throw new defaultErr(
        `Unexpected error with update active`,
        err.message,
        'fatal',
      );
    });

    console.log(updatedPost);

    const updatedActive = await Active.findByIdAndUpdate(
      createdActive._id,
      { $set: { comment: data.text } },
      { strict: false, new: true },
    ).catch((err) => {
      throw new defaultErr(
        `Unexpected error with loading active`,
        err.message,
        'fatal',
      );
    });

    return updatedActive;
  }

  async getActivePost(postId) {
    const postActives = await Active.find({ post_id: { $eq: postId } });

    await Promise.all(
      postActives.map(async (active) => {
        const author = await Users.findById(active.author);
        active._doc.avatar = this.modifyPath(author);
        active._doc.username = author.username;
        return active;
      }),
    );

    return postActives;
  }

  async getLatestComments() {
    let latestActives = await Active.find({ comment: { $exists: true } })
      .limit(5)
      .sort({ $natural: -1 });

    await Promise.all(
      latestActives.map(async (active) => {
        const author = await Users.findById(active.author);
        active._doc.avatar = this.modifyPath(author);
        active._doc.username = author.username;
        const post = await Post.findById(active.post_id);
        active._doc.title = post.title;
        return active;
      }),
    );

    return latestActives;
  }

  async countCategory() {
    const checkCategory = (category) => {
      const filter = `[{"$match":{"category":{"$eq":"${category}"}}},{"$count":"category_scores"}]`;
      return JSON.parse(filter);
    };

    const allCategory = ['best', 'singles', 'beatiful', 'software', 'another'];
    let counter = {};
    for (let item of allCategory) {
      const itemCount = await Post.aggregate(checkCategory(item));
      counter[item] = itemCount[0].category_scores;
    }

    return counter;
  }

  async getLatestPosts() {
    const posts = await Post.find().limit(4).sort({ $natural: -1 });

    await Promise.all(
      posts.map(async (post) => {
        const postActive = await Active.find({
          post_id: { $eq: post._id },
          comment: { $exists: true },
        });
        post._doc.comments = postActive.length;
        return post;
      }),
    );

    return posts.map((item) => this.modifyPath(item, 'sidebar'));
  }

  async getCategory(categoryName, skipPosts, limiter) {
    if (!categoryName) {
      throw new Error('не указана Category');
    }
    const posts = await Post.find({ category: { $eq: categoryName } })
      .skip(skipPosts)
      .limit(Number(limiter));
    return posts.map((item) => this.modifyPath(item, 'blog'));
  }

  async searchPosts(query) {
    if (!query) {
      throw new Error('не указан query');
    }

    try {
      query = decodeURI(query);
    } catch (e) {
      throw new Error('query break');
    }

    const posts = await Post.find({
      title: { $regex: query, $options: 'i' },
    });

    return posts.map((item) => this.modifyPath(item, 'blog'));
  }

  async getOne(id) {
    if (!id) {
      throw new Error('не указан ID');
    }
    const post = await Post.findById(id);
    const postActive = await Active.find({
      post_id: { $eq: id },
      comment: { $exists: true },
    });
    post._doc.comments = postActive.length;

    return this.modifyPath(post, 'feature');
  }

  async getStart() {
    await Post.insertMany(LoadPosts).catch((err) => {
      if (err) throw new Error('Unexpected Err');
    });
    await Users.insertMany(LoadUsers).catch((err) => {
      if (err) throw new Error('Unexpected Err');
    });
    const feature_p = await Post.findOne({ title: 'The best games of 2021' });
    const blog_p1 = await Post.findOne({ title: 'Top 5 worlds to explore' });
    const blog_p2 = await Post.findOne({
      title: 'Enjoy learning the game in 1 evening',
    });
    const blog_p3 = await Post.findOne({ title: 'Drive games for any player' });
    const blog_p4 = await Post.findOne({
      title: 'Games that you will want to play again',
    });

    await IndexPosts.create({
      feature_p: feature_p._id,
      blog_p: [blog_p1._id, blog_p2._id, blog_p3._id, blog_p4._id],
      small_p: [],
    }).catch((err) => {
      if (err) throw new Error('Unexpected Err');
    });

    let actives = [];

    await Promise.all(
      LoadActive.map(async (item) => {
        const post = await Post.findOne({ title: item.post_title });
        const user = await Users.findOne({ profile: item.author_profile });
        const postActive = {
          author: user._id,
          post_id: post._id,
          comment: item.comment_text,
        };
        actives.push(postActive);
      }),
    );

    await Active.insertMany(actives).catch((err) => {
      if (err) throw new defaultErr(err.message);
    });

    return 'Success';
  }
}

export default new PostService();

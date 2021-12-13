import PostService from './PostService.js';
import checkFiles from './utils/checkFiles.js';
import errorHandler from './utils/errorHandler.js';
import dotenv from 'dotenv';
dotenv.config();

function compareArrays(arr1, arr2) {
  return arr1.filter(function (i) {
    return arr2.indexOf(i) < 0;
  });
}

class PostController {
  async create(req, res) {
    try {
      if (!req.files) {
        res.status(400).json('Post images not sent');
        return;
      }

      const headImgKeys = {
        head_755x350: { width: 755, height: 350 },
        head_365x260: { width: 365, height: 260 },
        head_168x188: { width: 168, height: 188 },
        head_88x88: { width: 88, height: 88 },
      };

      const missingKeys = compareArrays(
        Object.keys(headImgKeys),
        Object.keys(req.files),
      );

      if (missingKeys.length) {
        const keys = missingKeys.join(', ');
        res.status(400).json(`Post validation failed: '${keys}' is required.`);
        return;
      }

      const sendHeadImg = {};

      for (let key in headImgKeys) {
        const magic = req.files[key].data.toString('hex').slice(0, 8);
        const mime = req.files[key].mimetype;
        const size = req.files[key].size < 4 * 1024 * 1024;
        const resolution = {
          imgBuffer: req.files[key].data,
          needWidth: headImgKeys[key].width,
          needHeight: headImgKeys[key].height,
        };
        const check = checkFiles.checkImg({ magic, mime, resolution });
        if (!check || !size) {
          console.log(`Failed to load image: '${key}'`);
          res.status(400).json(`Failed to load image: '${key}'`);
          return;
        }

        sendHeadImg[key] = req.files[key];
      }

      const post = await PostService.create(req.body, sendHeadImg);
      res.json(post);
    } catch (e) {
      if (e.name === 'checkImgError') {
        errorHandler.checkFilesError(e, res);
      } else if (e.name === 'defaultError') {
        res.status(500).json(e.message);
      } else {
        console.log(e.name + ' : ' + e.message);
        res.status(500).json('Error on the server');
      }
    }
  }

  async getIndexPosts(req, res) {
    try {
      const posts = await PostService.getIndexPosts();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getBestPosts(req, res) {
    try {
      const posts = await PostService.getBestPosts();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async createActive(req, res) {
    try {
      const postId = req.params.postId;
      if (!postId) {
        throw new Error(`Invalid post Id`);
      }

      const data = {
        // Author Должен определяться по авторизации
        author: req.body.author,
        active_type: req.body.active_type,
        text: req.body.active_type === 'comment' ? req.body.text : '',
      };

      for (let key in data) {
        if (typeof data[key] !== 'string') {
          throw new Error(`Invalid type: ${key}`);
        }
        if (key === 'active_type' && !['comment'].includes(data[key])) {
          throw new Error(`Unregistered activity type: '${data[key]}'`);
        }
        if (key === 'text' && !data[key].length) {
          throw new Error(`Comment text is null`);
        }
      }

      const active = await PostService.createActive(data, postId);
      return res.json(active);
    } catch (e) {
      if (e.name === 'TypeError') {
        console.log(e.message);
        res.status(500).json('Invalid Active Data');
      }
      res.status(500).json(e.message);
    }
  }

  async getActivePost(req, res) {
    const active = await PostService.getActivePost(req.params.postId);
    return res.json(active);
  }

  async getLatestComments(req, res) {
    const active = await PostService.getLatestComments();
    return res.json(active);
  }

  async countCategory(req, res) {
    try {
      const posts = await PostService.countCategory();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getLatestPosts(req, res) {
    try {
      const posts = await PostService.getLatestPosts();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getCategory(req, res) {
    try {
      if (!req.params.name || !req.query.page || !req.query.limit) {
        throw new Error(`Invalid query`);
      }
      const skipPosts = (Number(req.query.page) - 1) * req.query.limit;
      console.log(skipPosts);
      const posts = await PostService.getCategory(
        req.params.name,
        skipPosts,
        req.query.limit,
      );
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async searchPosts(req, res) {
    try {
      const posts = await PostService.searchPosts(req.params.query);
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const post = await PostService.getOne(req.params.id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();

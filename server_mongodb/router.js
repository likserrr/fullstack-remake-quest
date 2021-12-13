import Router from 'express';
import PostController from './PostController.js';

const router = new Router();

router.post('/posts', PostController.create);
router.post('/posts/active/:postId', PostController.createActive);
router.get('/posts/active/:postId', PostController.getActivePost);
router.get('/posts/active/latest/comments', PostController.getLatestComments);
router.get('/posts/index', PostController.getIndexPosts);
router.get('/posts/best', PostController.getBestPosts);
router.get('/posts/category', PostController.countCategory);
router.get('/posts/category/:name', PostController.getCategory);
router.get('/posts/search/:query', PostController.searchPosts);
router.get('/posts/latest', PostController.getLatestPosts);
router.get('/posts/:id', PostController.getOne);

export default router;

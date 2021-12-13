import { IPost } from '../models/posts/IPost';
import { makeAutoObservable } from 'mobx';
import PostService from '../services/PostService';
import toDate, { toDateActive } from '../utils/toDate';
import { AnyCategory, StoreCategory } from '../models/posts/ICategory';

import postsTemplate from '../utils/postsTemp.json';

import { CategoryCount, IndexResponse } from '../models/posts/IndexResponse';
import PostsStore from './InLocalStore';
import { IActive } from '../models/posts/IActive';

export default class Store {
  pageLoaderData = postsTemplate;

  // Posts select category blog page
  selectCategoryPosts = [] as IPost[];

  // Posts main category blog page
  featurePost = {} as IPost;
  blogPosts = [] as IPost[];
  smallPosts = [] as IPost[];

  categoryCount = {} as CategoryCount;
  selectCategory = {} as StoreCategory;

  latestPosts = [] as IPost[];
  latestActives = [] as IActive[];

  isLoading = true;
  isLoadingPosts = true;

  singlePost = {} as IPost;
  singlePostActive = [] as IActive[];
  singlePostId = '';
  checkSingle = true;

  redirect = false;

  searchQuery = null as string | null;

  constructor() {
    makeAutoObservable(this);
  }

  setCategoryCount(category_c: CategoryCount) {
    this.categoryCount = category_c;
  }

  setIndexPosts(posts: IndexResponse) {
    this.featurePost = toDate([posts.feature_p])[0];
    this.blogPosts = toDate(posts.blog_p);
    this.smallPosts = toDate(posts.small_p);
  }

  setCategoryPosts(posts: IPost[]) {
    this.selectCategoryPosts = toDate(posts);
  }

  async getIndex() {
    try {
      this.selectCategory = PostsStore.selectCategory();
      await this.getPosts(this.selectCategory);

      const categoryRes = await PostService.categoryCount();
      this.setCategoryCount(categoryRes.data);

      const latestPostsRes = await PostService.latestPosts();
      this.latestPosts = toDate(latestPostsRes.data);

      const latestActivesRes = await PostService.latestActives();
      this.latestActives = toDateActive(latestActivesRes.data);

      this.isLoading = false;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getPosts(category: StoreCategory) {
    try {
      this.selectCategory = category;
      this.isLoadingPosts = true;
      console.log('Отчистка поиска');
      this.searchQuery = null;

      let isCategory: false | StoreCategory;
      isCategory = category.category === AnyCategory.all ? false : category;

      if (!isCategory) {
        const indexPosts = await PostsStore.loadIndexPosts(category);
        this.setIndexPosts(indexPosts);
      } else {
        const categoryPosts = await PostsStore.loadCategoryPosts(category);

        this.setCategoryPosts(categoryPosts);
      }

      await this.timeout(500);

      this.isLoadingPosts = false;
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  }

  async getSearchPosts(query: string) {
    this.redirect = true;
    this.isLoadingPosts = true;
    const sendQuery = query.toLowerCase();
    this.searchQuery = sendQuery;
    const searchPosts = await PostService.searchPosts(sendQuery);
    this.blogPosts = toDate(searchPosts.data);
    this.isLoadingPosts = false;
    this.redirect = false;
  }

  async clickSinglePost() {
    window.scrollTo(0, 0);
    this.checkSingle = true;
    const singlePostRes = await PostService.singlePost(this.singlePostId);
    this.singlePost = toDate([singlePostRes.data])[0];
    const singlePostActiveRes = await PostService.singlePostActive(
      this.singlePostId,
    );
    this.singlePostActive = toDateActive(singlePostActiveRes.data);
    console.log(this.singlePost);
    await this.timeout(500);
    this.checkSingle = false;
  }

  clickCategory(category: StoreCategory) {
    window.scrollTo(0, 0);
    this.getPosts(category);
  }
}

import { makeAutoObservable } from 'mobx';
import { AnyCategory, StoreCategory } from '../models/posts/ICategory';
import { IndexResponse } from '../models/posts/IndexResponse';
import { IPost } from '../models/posts/IPost';
import PostService from '../services/PostService';

export default class PostsStore {
  static getIndexScelet() {
    const scelet = {
      feature_p: {},
    };
    return scelet;
  }

  static async loadCategoryPosts(category: StoreCategory): Promise<IPost[]> {
    const posts = await PostService.categoryPosts(category);
    localStorage.setItem('category', JSON.stringify(category));
    console.log(
      'Запрос на категорию отправлен. json: ' + JSON.stringify(category),
    );

    return posts.data;
  }

  static async loadIndexPosts(category: StoreCategory): Promise<IndexResponse> {
    // if (localStorage.category) localStorage.removeItem('category');
    const indexRes = await PostService.indexPost();
    localStorage.setItem('category', JSON.stringify(category));

    return indexRes.data;
  }

  static selectCategory(): StoreCategory {
    const categoryJSON = localStorage.getItem('category');

    if (typeof categoryJSON === 'string') {
      const category: StoreCategory = JSON.parse(categoryJSON);
      if (!category.category) {
        console.log('Ошибка при загрузке объекта с категориями');
      }

      return category;
    }

    return { category: AnyCategory.all };
  }
}

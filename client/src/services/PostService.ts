import axios from 'axios';
import { AxiosResponse } from 'axios';
import { IActive } from '../models/posts/IActive';
import { StoreCategory } from '../models/posts/ICategory';
import { IndexResponse, CategoryCount } from '../models/posts/IndexResponse';
import { IPost } from '../models/posts/IPost';

export default class PostService {
  static async indexPost(): Promise<AxiosResponse<IndexResponse>> {
    return axios.get<IndexResponse>('http://localhost:5000/api/posts/index');
  }
  static async categoryCount(): Promise<AxiosResponse<CategoryCount>> {
    return axios.get<CategoryCount>('http://localhost:5000/api/posts/category');
  }
  static async categoryPosts(
    data: StoreCategory,
  ): Promise<AxiosResponse<IPost[]>> {
    return axios.get<IPost[]>(
      `http://localhost:5000/api/posts/category/${data.category}`,
      {
        params: {
          page: data.page,
          limit: 4,
        },
      },
    );
  }
  static async searchPosts(query: string): Promise<AxiosResponse<IPost[]>> {
    const encodedQuery = encodeURI(query);
    return axios.get<IPost[]>(
      `http://localhost:5000/api/posts/search/${encodedQuery}`,
    );
  }

  static async latestPosts(): Promise<AxiosResponse<IPost[]>> {
    return axios.get<IPost[]>(`http://localhost:5000/api/posts/latest`);
  }

  static async latestActives(): Promise<AxiosResponse<IActive[]>> {
    return axios.get<IActive[]>(
      `http://localhost:5000/api/posts/active/latest/comments`,
    );
  }

  static async singlePost(id: string): Promise<AxiosResponse<IPost>> {
    return axios.get<IPost>(`http://localhost:5000/api/posts/${id}`);
  }

  static async singlePostActive(id: string): Promise<AxiosResponse<IActive[]>> {
    return axios.get<IActive[]>(`http://localhost:5000/api/posts/active/${id}`);
  }
}

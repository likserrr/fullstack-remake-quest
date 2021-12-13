import { IActive } from './IActive';
import { IPost } from './IPost';

export interface IndexResponse {
  _id: string;
  date_update: Date;
  feature_p: IPost;
  blog_p: IPost[];
  small_p: IPost[];
}

export interface CategoryCount {
  best: number;
  singles: number;
  beatiful: number;
  software: number;
  another: number;
}

export interface SelectCategory {
  category: IPost[];
}

export interface LatestActives {
  active: IActive[]
}

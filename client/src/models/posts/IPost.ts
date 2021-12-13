import { AnyCategory } from './ICategory';

export interface IPost {
  _id: string;
  title: string;
  h1: string;
  content: string;
  category: string;
  author: string;
  headimg_dir: string;
  files_dir: any[];
  date: string;
  comments: number;
}

export interface DateFormat {
  year: string;
  month: string;
  day: string;
}

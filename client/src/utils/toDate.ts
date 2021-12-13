import { IActive } from '../models/posts/IActive';
import { IPost } from '../models/posts/IPost';

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const toDate = (posts: IPost[]): IPost[] => {
  posts.map(
    (post: IPost) =>
      (post.date = new Date(post.date).toLocaleDateString('en-US', options)),
  );

  return posts;
};

export const toDateActive = (comments: IActive[]): IActive[] => {
  comments.map(
    (comment: IActive) =>
      (comment.time = new Date(comment.time).toLocaleDateString(
        'en-US',
        options,
      )),
  );

  return comments;
};

export default toDate;

// export function toDate(props: DateProps) {}

import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { IPost } from '../../models/posts/IPost';
import { categoryEnum } from '../../utils/categoryEnum';

interface LatestPostProps {
  latest_p: IPost;
}

const LatestNews: FC<LatestPostProps> = (props) => {
  const { store } = useContext(Context);

  const data = props.latest_p;

  return (
    <div className="ln-item">
      <img src={data.headimg_dir} alt="" />
      <div className="ln-text">
        <div className="ln-date">{data.date}</div>
        <Link to={`/${data._id}`}>
          <h6>{data.title}</h6>
        </Link>
        <div className="ln-metas">
          <div className="ln-meta">{data.author}</div>

          <div
            className="ln-meta"
            onClick={() => {
              const category = categoryEnum(data.category);
              store.clickCategory(category);
            }}>
            in{' '}
            <Link to={`/`}>
              <span className="post-category">{data.category}</span>
            </Link>
          </div>
          <div className="ln-meta">{data.comments} comments</div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;

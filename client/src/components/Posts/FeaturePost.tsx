import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { IPost } from '../../models/posts/IPost';
import { categoryEnum } from '../../utils/categoryEnum';

interface FeatureProps {
  feature_p: IPost;
  loading?: boolean;
}

const FeaturePost: FC<FeatureProps> = (props) => {
  const { store } = useContext(Context);

  const loading = props?.loading ? props.loading : false;
  const postData = props.feature_p;

  return (
    <div className="blog-post featured-post">
      <img
        className={loading ? 'placeholder' : ''}
        src={postData.headimg_dir}
        alt=""
      />
      <div className={loading ? 'post-date placeholder' : 'post-date'}>
        {postData.date}
      </div>
      <h3 className={loading ? 'placeholder' : ''}>{postData.title}</h3>
      <div className="post-metas">
        <div className={loading ? 'post-meta placeholder' : 'post-meta'}>
          {postData.author}
        </div>
        <div
          className={loading ? 'post-meta placeholder' : 'post-meta'}
          onClick={() => {
            const category = categoryEnum(postData.category);
            store.clickCategory(category);
          }}>
          in <span className="post-category">{postData.category}</span>
        </div>
        <div className={loading ? 'post-meta placeholder' : 'post-meta'}>
          {postData.comments} Comments
        </div>
      </div>
      <p className={loading ? 'placeholder' : ''}>{postData.h1}</p>
      <Link to={`/${postData._id}`}>
        <div className={loading ? 'site-btn placeholder' : 'site-btn'}>
          Read More
        </div>
      </Link>
    </div>
  );
};

export default FeaturePost;

import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../..';
import { categoryEnum } from '../../utils/categoryEnum';

const SinglePost: FC = () => {
  const { store } = useContext(Context);
  let { id } = useParams();
  store.singlePostId = id || '';

  useEffect(() => {
    store.clickSinglePost();
  }, [store.singlePostId]);

  if (store.checkSingle) {
    console.log(123);
    return (
      <img
        style={{
          width: '100px',
          height: '100px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        src="./img/loader.svg"
      />
    );
  }

  const postData = store.singlePost;
  const postActive = store.singlePostActive;

  console.log(postActive[0].comment);

  return (
    <div className="blog-post single-post">
      <img src={postData.headimg_dir} alt="" />
      <div className="post-date">{postData.date}</div>
      <h3>{postData.title}</h3>
      <div className="post-metas">
        <div className="post-meta">{postData.author}</div>
        <div className="post-meta">
          in{' '}
          <Link to={`/`}>
            <div
              onClick={() => {
                const category = categoryEnum(postData.category);
                store.clickCategory(category);
              }}
              className="ln-meta">
              {postData.category}
            </div>
          </Link>
        </div>
        <div className="post-meta">{postData.comments} Comments</div>
      </div>
      <p>{postData.content}</p>

      <div className="comments">
        <h5>Comments ({postData.comments})</h5>
        <ul className="comments-list">
          {postActive.map((active) => (
            <li key={active._id}>
              <img src={active.avatar} alt="" />
              <div className="comment-text">
                <h6>
                  {active.username}{' '}
                  <a href="#" className="reply">
                    Reply
                  </a>
                </h6>
                <div className="comment-date">{active.time}</div>
                <p>{active.comment}</p>
              </div>
            </li>
          ))}
        </ul>
        <h5>Leave a comment</h5>
        <form className="comment-form">
          <div className="user-data">
            <input type="text" placeholder="Your name" />
            <input type="text" placeholder="Your e-mail" />
          </div>
          <div className="send-data">
            <textarea placeholder="Your message"></textarea>
            <button className="site-btn">post Comment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default observer(SinglePost);

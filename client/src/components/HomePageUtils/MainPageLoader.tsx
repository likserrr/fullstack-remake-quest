import React, { FC, useContext } from 'react';
import { Context } from '../..';
import { AnyCategory } from '../../models/posts/ICategory';
import BlogPost from '../Posts/BlogPost';
import FeaturePost from '../Posts/FeaturePost';
import Sidebar from './Sidebar';

const MainPageLoader = () => {
  const { store } = useContext(Context);

  return (
    <>
      <div className="blog-posts">
        {store.selectCategory.category === AnyCategory.all ? (
          <>
            <FeaturePost
              feature_p={store.pageLoaderData.feature_p}
              loading></FeaturePost>
            <div className="blog-main">
              {store.pageLoaderData.blog_p.map((post, i) => (
                <BlogPost key={i} blog_p={post} loading></BlogPost>
              ))}
            </div>
          </>
        ) : (
          <div className="blog-main">
            {store.pageLoaderData.blog_p.map((post, i) => (
              <BlogPost key={i} blog_p={post} loading></BlogPost>
            ))}
          </div>
        )}
      </div>
      {store.isLoading ? <h1></h1> : <Sidebar />}
    </>
  );
};

export default MainPageLoader;

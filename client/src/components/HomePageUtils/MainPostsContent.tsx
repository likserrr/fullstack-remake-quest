import React, { useContext } from 'react';
import { Context } from '../..';
import { AnyCategory } from '../../models/posts/ICategory';
import BlogPost from '../Posts/BlogPost';
import FeaturePost from '../Posts/FeaturePost';
import Paginator from '../Widgets/Paginator';

const MainPostsContent = () => {
  const { store } = useContext(Context);

  return (
    <>
      {store.selectCategory.category === AnyCategory.all ? (
        <>
          <FeaturePost feature_p={store.featurePost} />
          <div className="blog-main">
            {store.blogPosts.map((post) => (
              <BlogPost key={post._id} blog_p={post} />
            ))}
          </div>
        </>
      ) : (
        <>
          <img
            src={`./img/category-banners/${store.selectCategory.category}.jpg`}
          />
          <Paginator />
          <div className="blog-main">
            {store.selectCategoryPosts.map((post) => (
              <BlogPost key={post._id} blog_p={post} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MainPostsContent;

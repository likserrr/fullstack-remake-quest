import React from 'react';
import { useEffect } from 'react';
import { FC, useContext } from 'react';
import { Context } from '../index';

import BlogPost from '../components/Posts/BlogPost';
import FeaturePost from '../components/Posts/FeaturePost';

import { observer } from 'mobx-react-lite';
import { AnyCategory } from '../models/posts/ICategory';
import Paginator from '../components/Widgets/Paginator';
import MainPageLoader from '../components/HomePageUtils/MainPageLoader';
import Sidebar from '../components/HomePageUtils/Sidebar';
import MainPostsContent from '../components/HomePageUtils/MainPostsContent';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SinglePost from '../components/HomePageUtils/SinglePost';

const Home: FC = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    console.log('Отправка запроса');
    store.getIndex();
  }, []);

  return (
    <section className="blog-section spad">
      <div className="container">
        <div className="blog-posts-main">
          {store.isLoading || store.isLoadingPosts ? (
            <MainPageLoader />
          ) : (
            <>
              {store.redirect ? <Navigate replace to="/" /> : null}
              <Routes>
                <Route
                  path="/"
                  element={
                    <div className="blog-posts">
                      {store.searchQuery === null ? (
                        <MainPostsContent />
                      ) : (
                        <div className="blog-main">
                          {store.blogPosts.map((post) => (
                            <BlogPost key={post._id} blog_p={post} />
                          ))}
                        </div>
                      )}
                    </div>
                  }
                />

                <Route path="/:id" element={<SinglePost />} />
              </Routes>
              <Sidebar />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default observer(Home);

import React, { useContext } from 'react';
import { Context } from '../..';
import Banner from '../SbWidgets/Banner';
import Category from '../SbWidgets/Category';
import LatestAct from '../SbWidgets/LatestAct';
import LatestNews from '../SbWidgets/LatestNews';
import Search from '../SbWidgets/Search';

const Sidebar = () => {
  const { store } = useContext(Context);

  const latestPosts = store.latestPosts;
  const latestActives = store.latestActives;

  return (
    <div className="sidebar">
      <Search></Search>
      <Category></Category>
      <div className="sb-widget">
        <h2 className="sb-title">Latest News</h2>
        <div className="latest-news-widget">
          {latestPosts.map((post) => (
            <LatestNews latest_p={post} key={post._id}></LatestNews>
          ))}
        </div>
      </div>
      <Banner></Banner>
      <div className="sb-widget">
        <h2 className="sb-title">Latest Comments</h2>
        <div className="latest-comments-widget">
          {latestActives.map((comment) => (
            <LatestAct latest_a={comment} key={comment._id}></LatestAct>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Context } from '../..';
import { AnyCategory, StoreCategory } from '../../models/posts/ICategory';
import { CategoryCount } from '../../models/posts/IndexResponse';
import { Link } from 'react-router-dom';

const Category: FC = () => {
  const { store } = useContext(Context);

  const data = store.categoryCount;
  const sumCategory = Object.values(data).sum();

  return (
    <div className="sb-widget">
      <h2 className="sb-title">Categories</h2>
      <ul className="sb-cata-list">
        <li>
          <Link to={`/`}>
            <div
              onClick={() => {
                store.clickCategory({ category: AnyCategory.all });
              }}>
              All Games<span>{sumCategory}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <div
              onClick={() => {
                store.clickCategory({ category: AnyCategory.best, page: 1 });
              }}>
              Best Games<span>{data.best}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <div
              onClick={() => {
                store.clickCategory({
                  category: AnyCategory.beatiful,
                  page: 1,
                });
              }}>
              Beatiful Games<span>{data.beatiful}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <div
              onClick={() => {
                store.clickCategory({ category: AnyCategory.singles, page: 1 });
              }}>
              Singles Games<span>{data.singles}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <div
              onClick={() => {
                store.clickCategory({
                  category: AnyCategory.software,
                  page: 1,
                });
              }}>
              Software<span>{data.software}</span>
            </div>
          </Link>
        </li>
        <li>
          <Link to={`/`}>
            <div
              onClick={() => {
                store.clickCategory({ category: AnyCategory.another, page: 1 });
              }}>
              Another Theme<span>{data.another}</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default observer(Category);

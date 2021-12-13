import { count } from 'console';
import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';
import { Context } from '../..';
import { AnyCategory } from '../../models/posts/ICategory';

const Paginator: FC = () => {
  const { store } = useContext(Context);
  const postLimit = 4;

  const category = store.selectCategory.category;
  let counter: number, page: number;
  if (category !== AnyCategory.all) {
    // Поработать тут с конфликтом типов
    page = store.selectCategory.page || 1;
    counter = store.categoryCount[category];
  } else {
    return <h1>Пагинатор не используется на главной странице</h1>;
  }

  const lastPage = Math.ceil(counter / postLimit);

  const startChecked = page !== 1 ? 'post-start' : 'post-start locked';
  const startCheckedArrow = page !== 1 ? 'post-arrow' : 'post-arrow locked';
  const endChecked = page !== lastPage ? 'post-start' : 'post-start locked';
  const endCheckedArrow =
    page !== lastPage ? 'post-arrow' : 'post-arrow locked';

  return (
    <div className="post-navigation">
      <div className="post-paginator">
        <svg viewBox="0 0 512 512" className={startChecked}>
          <use href="./img/icons/paginator/home-category/start.svg#start"></use>
        </svg>
        <svg viewBox="0 0 512 512" className={startCheckedArrow}>
          <use href="./img/icons/paginator/home-category/arrow-left.svg#arrow"></use>
        </svg>
        <input
          type="number"
          placeholder={String(page)}
          className="navigation-input"
          min="1"
          max={lastPage}
        />
        <svg viewBox="0 0 512 512" className={endCheckedArrow}>
          <use href="./img/icons/paginator/home-category/arrow-right.svg#arrow"></use>
        </svg>
        <svg viewBox="0 0 512 512" className={endChecked}>
          <use href="./img/icons/paginator/home-category/end.svg#end"></use>
        </svg>
      </div>

      <div className="sel-category">{category}</div>
      <input placeholder="Search Game" className="navigation-input" />
    </div>
  );
};

export default observer(Paginator);

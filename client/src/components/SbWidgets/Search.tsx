import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../..';

const Search: FC = () => {
  const { store } = useContext(Context);
  const [inputTimeout, setInputTimeout] = useState(false);
  const [test, setTest] = useState('');

  let inputChangeTimeout: null | ReturnType<typeof setTimeout> = null;
  const searchInput = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTest(store.searchQuery || '');
    if (searchInput.current && store.searchQuery !== null) {
      searchInput.current.focus();
    }
  }, []);

  function searchQuery(event: React.ChangeEvent<HTMLInputElement>) {
    setTest(event.target.value);
    if (!inputTimeout) {
      inputChangeTimeout = setTimeout(function () {
        if (event.target.value !== '') {
          store.getSearchPosts(event.target.value);
        } else {
          store.searchQuery = null;
        }
        setInputTimeout(false);
      }, 2000);
      setInputTimeout(true);
    }
  }

  return (
    <div className="sb-widget">
      <form className="sb-search">
        <input
          type="text"
          value={test}
          placeholder="Search"
          onChange={searchQuery}
          ref={searchInput}
        />
      </form>
    </div>
  );
};

export default observer(Search);

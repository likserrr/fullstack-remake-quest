import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles/style.scss';
import './utils/extensions.ts';

import Store from './store/store';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store,
});

ReactDOM.render(
  <Router>
    <Context.Provider
      value={{
        store,
      }}>
      <App />
    </Context.Provider>
  </Router>,
  document.getElementById('root'),
);

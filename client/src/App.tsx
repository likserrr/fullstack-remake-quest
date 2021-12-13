import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react';
import { Context } from '.';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer/Footer';

const App: FC = () => {
  const { store } = useContext(Context);

  // useEffect(() => {
  //   store.getIndex();
  // }, []);

  return (
    <>
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </>
  );
};

export default observer(App);

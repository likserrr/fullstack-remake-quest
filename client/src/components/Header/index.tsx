import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header_section}>
      <a href="index.html" className={styles.site_logo}>
        <img src="img/logo.png" alt="logo" />
      </a>
      <ul className={styles.main_menu}>
        <li>
          <a href="index.html">Home</a>
        </li>
        <li>
          <a href="characters.html">Characters</a>
        </li>
        <li>
          <a href="game.html">Games</a>
        </li>
        <li>
          <a href="reviews.html">Reviews</a>
        </li>
        <li>
          <a href="news.html">News</a>
        </li>
        <li>
          <a href="single-post.html">Page</a>
        </li>
      </ul>
      <div className={styles.header_add}>
        <img src="img/add.jpg" alt="" />
      </div>
    </header>
  );
};

export default Header;

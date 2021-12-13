import React, { FC } from 'react';

const MainPostSelect: FC = () => {
  return (
    <div className="blog-post single-post">
      <img src="img/blog/1.jpg" alt="" />
      <div className="post-date">April 1, 2019</div>
      <h3>The best games of 2019</h3>
      <div className="post-metas">
        <div className="post-meta">By Admin</div>
        <div className="post-meta">
          in <a href="#">Games</a>
        </div>
        <div className="post-meta">3 Comments</div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
        suspendisse ultrices gravida. Risus commodo viverra maecenas ac-cumsan
        lacus vel facilisis. Fusce urna quam, euismod sit amet mollis quis,
        vestibulum quis velit. Morbi id dictum quam, ut commodo lorem. In at
        nisi nec arcu porttitor aliquet vitae at dui.{' '}
      </p>
      <p>
        Donec eget efficitur ex. Donec eget dolor vitae eros feugiat tristique
        id vitae massa. Proin vulputate congue rutrum. Fusce lobortis a enim
        eget tempus. className aptent taciti sociosqu ad litora torquent per
        conubia nostra, per inceptos himenaeos. Suspendisse potenti. Ut gravida
        mattis magna, non varius lorem sodales nec. In libero orci, ornare non
        nisl a, auctor euismod purus. Morbi pretium interdum vestibulum. Fusce
        nec eleifend ipsum. Sed non blandit tellus.
      </p>
      <p>
        Fusce urna quam, euismod sit amet mollis quis, vestibulum quis velit.
        Vestibulum malesuada aliquet libero viverra cursus. Aliquam erat
        volutpat. Morbi id dictum quam, ut commodo lorem. In at nisi nec arcu
        porttitor aliquet vitae at dui. Sed sollicitudin nulla non leo viverra
        scelerisque. Phasellus facilisis lobortis metus, sit amet viverra lectus
        finibus ac. Aenean non felis dapibus, placerat libero auctor, ornare
        ante. Morbi quis ex eleifend, sodales nulla vitae, scelerisque ante.
        Nunc id vulputate dui. Suspendisse consecte-tur rutrum metus nec
        scelerisque.{' '}
      </p>

      <div className="comments">
        <h5>Comments (2)</h5>
        <ul className="comments-list">
          <li>
            <img src="img/author-thumbs/1.jpg" alt="" />
            <div className="comment-text">
              <h6>
                Jane Smith{' '}
                <a href="#" className="reply">
                  Reply
                </a>
              </h6>
              <div className="comment-date">April 1,2019</div>
              <p>
                Aenean non felis dapibus, placerat libero auctor, ornare ante.
                Morbi quis ex eleifend, sodales nulla vitae, scelerisque ante.
                Nunc id vulputate dui. Suspendisse consectetur rutrum metus nec
                scelerisque.{' '}
              </p>
            </div>
          </li>
          <li>
            <img src="img/author-thumbs/2.jpg" alt="" />
            <div className="comment-text">
              <h6>
                Michael James{' '}
                <a href="#" className="reply">
                  Reply
                </a>
              </h6>
              <div className="comment-date">April 1,2019</div>
              <p>
                Non felis dapibus, placerat libero auctor, ornare ante. Morbi
                quis ex eleifend, sodales nulla vitae, scelerisque ante. Nunc id
                vulputate dui. Suspendisse consectetur rutrum metus.
              </p>
            </div>
          </li>
        </ul>
        <h5>Leave a comment</h5>
        <form className="comment-form">
          <div className="row">
            <div className="col-md-6">
              <input type="text" placeholder="Your name" />
            </div>
            <div className="col-md-6">
              <input type="text" placeholder="Your e-mail" />
            </div>
            <div className="col-md-12">
              <textarea placeholder="Your message"></textarea>
              <button className="site-btn">post Comment</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MainPostSelect;

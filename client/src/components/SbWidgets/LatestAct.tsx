import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../..';
import { IActive } from '../../models/posts/IActive';

interface LatestActiveProps {
  latest_a: IActive;
}

const LatestAct: FC<LatestActiveProps> = (props) => {
  const { store } = useContext(Context);

  const data = props.latest_a;

  return (
    <div className="lc-item">
      <img src={data.avatar} alt="" />
      <div className="lc-text">
        <h6>
          {data.username}
          <span> In </span>
          <Link to={`/${data.post_id}`}>
            <div className="act-title">{data.title}</div>
          </Link>
        </h6>
        <div className="lc-date">{data.time}</div>
      </div>
    </div>
  );
};

export default LatestAct;

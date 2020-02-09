import React from 'react';
import Style from './Userlist.module.css';

const Userlist = (props) => {
  const {
    cardShow,
    avatarUrl,
    login,
    name,
    location,
    htmlUrl,
    publicRepos,
    followers,
  } = props;
  return (
    <div>
      {cardShow && (
      <div className={`${Style.card} ${Style.cardBox}`}>
        <div><img src={avatarUrl} alt="user" /></div>
        <div className={Style.card__title}>{login}</div>

        <div className={Style.card__content}>
          <div>
            <b>Name: </b>
            {name}
          </div>
          <br />
          <div>
            <b>Location: </b>
            {location}
          </div>
          <br />
          <div>
            <b>GitHhb url: </b>
            <a href={`${htmlUrl}`} rel="noopener noreferrer">
              {htmlUrl}
            </a>
          </div>
          <br />
          <div>
            <b>Repositories: </b>
            {publicRepos}
          </div>
          <br />
          <div>
            <b>Followers: </b>
            {followers}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Userlist;

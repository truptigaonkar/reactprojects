import React from 'react';
import ReactPlayer from 'react-player';
import Style from './Medialist.module.css';

const Medialistvideos = (props) => {
  const { medias } = props;
  return (
    <>
      {medias.map((media) => (
          <div className={`${Style.card} ${Style.cardBox}`}>
        <div className={Style.card__content} key={media.id}>
          { media.videos && (
          <div>
            <ReactPlayer
              url={media.videos.small.url}
              className="react-player"
              playing
              width="100%"
              height="100%"
            />
          </div>
          ) }
          <div className={Style.card__title}>{media.tags}</div>
        </div>
        </div>
      ))}
    </>
  );
};

export default Medialistvideos;

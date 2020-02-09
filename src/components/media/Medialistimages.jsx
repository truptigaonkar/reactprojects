import React from 'react';
import Style from './Medialist.module.css';

const Medialist = (props) => {
  const { medias } = props;
  return (
    <>
      {medias.map((media) => (
        <div className={`${Style.card} ${Style.cardBox}`}>
          <div className={Style.card__content} key={media.id}>
            <div className={Style.card__image}><img src={media.previewURL} alt="url" style={{ width: '100%', height: '100%' }} /></div>
            <div className={Style.card__title}>{media.tags}</div>
          </div>
        </div>
      ))}

    </>
  );
};

export default Medialist;

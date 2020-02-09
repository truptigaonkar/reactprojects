import React from 'react';
import ReactPlayer from 'react-player';

const Medialist = (props) => {
  const { medias } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-center', flexWrap: 'wrap' }}>
      {medias.map((media) => (
        <div className="card" key={media.id}>
          <div><img src={media.previewURL} alt="url" style={{ width: '100%', height: '100%' }} /></div>
          <div>{media.tags}</div>
        </div>
      ))}
      {medias.map((media) => (
        <div className="card" key={media.id}>
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
          <div>{media.tags}</div>
        </div>
      ))}
    </div>
  );
};

export default Medialist;

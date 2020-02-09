import React from 'react';
import Style from './Weatherlist.module.css';

const Weatherlist = (props) => {
  const {
    cardShow, city, country, icon, description, temp, tempMin, tempMax,
  } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {cardShow
                    && (
                      <div className={`${Style.card} ${Style.cardBox}`}>
                        <div className={Style.card__title}>{city}</div>
                        <div className={Style.card__title}>{country}</div>
                        <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="wthr img" width="200px" />
                        <div className={Style.card__content}>
                          <b>{description}</b>

                          <p>
                            <b>Temperature: </b>
                            {temp}
                          </p>
                          <p>
                            <b>MIN Temperature: </b>
                            {tempMin}
                          </p>
                          <p>
                            <b>MAX Temperature: </b>
                            {tempMax}
                          </p>
                        </div>x 
                      </div>
                    )}
    </div>

  );
};

export default Weatherlist;

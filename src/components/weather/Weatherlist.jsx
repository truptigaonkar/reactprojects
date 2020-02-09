import React from 'react';
import {
  Card, CardHeader, CardContent, Typography,
} from '@material-ui/core';

const Weatherlist = (props) => {
  const {
    cardShow, city, country, icon, description, temp, tempMin, tempMax,
  } = props;
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {cardShow
                    && (
                    <div>
                      <Card style={{
                        width: 300,
                      }}
                      >
                        <CardHeader
                          title={city}
                          subheader={country}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="wthr img" width="200px" />
                          </Typography>
                          <b>{description}</b>
                          <Typography variant="body2" color="textSecondary" component="p">
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
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                    )}
    </div>

  );
};

export default Weatherlist;

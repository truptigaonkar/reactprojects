/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import axios from 'axios';
import {
  TextField, Fab, Card, CardHeader, CardContent, Typography, AppBar, Button, Link,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: false, cardShow: false };
  }

  // Disappear error message after 3000sec.
  componentDidUpdate() {
    setTimeout(() => this.setState({ errorMessage: '' }), 3000);
  }

    getWeather = (e) => {
      e.preventDefault();
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        .then((response) => {
          if (city && country) {
            this.setState({
              // weather: response.data,
              city: response.data.name,
              country: response.data.sys.country,
              temp: response.data.main.temp,
              tempMin: response.data.main.temp_min,
              tempMax: response.data.main.temp_max,
              description: response.data.weather[0].description,
              icon: response.data.weather[0].icon,
              errorMessage: false,
              cardShow: true,
            });
          } else {
            this.setState({
              errorMessage: true,
              cardShow: false,
            });
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            this.setState({
              errorMessage:
                            'Weather with the supplied city and country does not exist. Please enter valid city and country',
            });
          } else if (error.response.status === 401) {
            this.setState({
              errorMessage:
                            'Unauthorized user. Please provide valid API_KEY.',
            });
          }
        });
      e.target.reset(); // making input empty
    }

    render() {
      const { errorMessage } = this.state;
      const { cardShow } = this.state;
      const { city } = this.state;
      const { country } = this.state;
      const { description } = this.state;
      const { temp } = this.state;
      const { tempMin } = this.state;
      const { tempMax } = this.state;
      const { icon } = this.state;
      return (
        <>
        <br />
          <form onSubmit={this.getWeather}>
            <TextField id="filled-basic" label="city" variant="filled" name="city" placeholder="e.g. London" />
            {' '}
            <TextField id="filled-basic" label="country" variant="filled" name="country" placeholder="e.g. UK" />
            {' '}
            <Fab type="submit" color="primary" aria-label="add"><AddIcon /></Fab>
          </form>
          <br />
          <div className="warning">{errorMessage}</div>
          <br />
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
          <br />
          <br />
          <AppBar position="fixed" color="default" style={{ top: 'auto', bottom: 0 }}>
            <Button color="primary">
              <Link href="https://openweathermap.org/api" color="inherit">
                <b>Weather API</b>
: https://openweathermap.org/api
              </Link>
            </Button>
          </AppBar>
        </>
      );
    }
}

export default Weather;

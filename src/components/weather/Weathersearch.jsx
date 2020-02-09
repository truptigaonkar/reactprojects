/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
import axios from 'axios';
import { WEATHER_URL, WEATHER_APIKEY } from '../config';
import Weatherlist from './Weatherlist';
import Style from './Weathersearch.module.css';

class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: false,
      cardShow: false,
      alertShow: false,
    };
  }

    getWeather = (e) => {
      e.preventDefault();
      const city = e.target.elements.city.value;
      const country = e.target.elements.country.value;

      axios.get(`${WEATHER_URL}?q=${city},${country}&appid=${WEATHER_APIKEY}&units=metric`)
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
              alertShow: false,
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
              alertShow: true,
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
      const { alertShow } = this.state;

      return (
        <>
        <br />
          <form onSubmit={this.getWeather}>

            <div className={Style.form}>
              <div className="inputfield" style={{ marginRight: '20px' }}>
                <input
                  type="text"
                  id="city"
                  className={Style.form__field}
                  placeholder="Github User...."
                />
                <label htmlFor="city" className={Style.form__label}>
            e.g. London
                </label>
              </div>

              <div className="inputfield">
                <input
                  type="text"
                  id="country"
                  className={Style.form__field}
                  placeholder="Github User...."
                />
                <label htmlFor="country" className={Style.form__label}>
            e.g. Uk
                </label>
              </div>

              <button type="submit" className={Style.buttonGetweather}>GET Weather</button>
            </div>

          </form>
          <br />
          {alertShow && (
          <div className={`${Style.alert} ${Style.alertWarning}`}>{errorMessage}</div>)}
          <br />
          <Weatherlist cardShow={cardShow} city={city} country={country} icon={icon} description={description} temp={temp} tempMin={tempMin} tempMax={tempMax} />
          <br />
          <br />
          <footer>
            <a href="https://openweathermap.org/api" color="inherit">
              <b>Weather API</b>
            </a>
          </footer>
        </>
      );
    }
}

export default Weather;

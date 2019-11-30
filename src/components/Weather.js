import React, { Component } from 'react'
import axios from 'axios'

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class Weather extends Component {
    state = { errorMessage: false, cardShow: false };
    getWeather = e => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
            .then(response => {
                console.log(response.data);
                if (city && country) {
                    this.setState({
                        //weather: response.data,
                        city: response.data.name,
                        country: response.data.sys.country,
                        temp: response.data.main.temp,
                        humidity: response.data.main.humidity,
                        description: response.data.weather[0].description,
                        errorMessage: false,
                        cardShow: true
                    });
                } else {
                    this.setState({
                        errorMessage: true,
                        cardShow: false
                    });
                }
            })
            .catch(error => {
                console.log("Error is:", error);
                if (error.response.status === 404) {
                    this.setState({
                        errorMessage:
                            "Weather with the supplied city and country does not exist. Please enter valid city and country"
                    });
                } else if (error.response.status === 401) {
                    this.setState({
                        errorMessage:
                            "Unauthorized user. Please provide valid API_KEY."
                    });
                }
            });
        e.target.reset(); //making input empty
    }

    //Disappear error message after 2000sec.
    componentDidUpdate() {
        setTimeout(() => this.setState({ errorMessage: "" }), 2000);
    }

    render() {
        return (
            <>
                <h3>Weather CARD</h3>
                {this.state.errorMessage}
                <form onSubmit={this.getWeather}>
                    <input type="text" name='city' placeholder='e.g. London' />
                    <input type="text" name='country' placeholder='e.g. UK' />
                    <button>GET Weather</button>
                </form>
                {this.state.cardShow &&
                    <div>
                        <p><b>Location: </b>{this.state.city}, {this.state.country}</p>
                        <p><b>Temprature: </b>{this.state.temp}</p>
                        <p><b>humidity: </b>{this.state.humidity}</p>
                        <p><b>Description: </b>{this.state.description}</p>
                    </div>
                }
            </>
        )
    }
}

export default Weather;

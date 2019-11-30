import React, { Component } from 'react'
import axios from 'axios'

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class Weather extends Component {
    getWeather = e =>{
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
        .then(response => {
            console.log(response.data);
        })
    }
    render() {
        return (
            <>
                <h3>Weather CARD</h3>
                <form onSubmit={this.getWeather}>
                    <input type="text" name='city' placeholder='e.g. London'/>
                    <input type="text" name='country' placeholder='e.g. UK'/>
                    <button>GET Weather</button>
                    </form>
            </>
        )
    }
}

export default Weather;

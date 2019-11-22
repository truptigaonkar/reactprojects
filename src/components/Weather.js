import React, { Component } from 'react'
import { Helmet } from 'react-helmet';

class Weather extends Component {
    render() {
        return (
            <div>
            <Helmet><title>Weather</title></Helmet>
                <h1>Weather api</h1>
            </div>
        )
    }
}

export default Weather

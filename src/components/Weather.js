import React, { Component } from 'react'
import axios from 'axios'
import { TextField, Fab, Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';

const API_KEY = `${process.env.REACT_APP_API_KEY}`;

class Weather extends Component {
    state = { errorMessage: false, cardShow: false };
    getWeather = e => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)
            .then(response => {
                console.log(response.data);
                if (city && country) {
                    this.setState({
                        //weather: response.data,
                        city: response.data.name,
                        country: response.data.sys.country,
                        temp: response.data.main.temp,
                        temp_min: response.data.main.temp_min,
                        temp_max: response.data.main.temp_max,
                        description: response.data.weather[0].description,
                        icon: response.data.weather[0].icon,
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

    //Disappear error message after 3000sec.
    componentDidUpdate() {
        setTimeout(() => this.setState({ errorMessage: "" }), 3000);
    }

    render() {
        return (
            <>
                <h3>Weather CARD</h3>
                <div className="warning">{this.state.errorMessage}</div><br />

                <form onSubmit={this.getWeather}>
                    <TextField id="filled-basic" label="city" variant="filled" name='city' placeholder='e.g. London' /> <TextField id="filled-basic" label="country" variant="filled" name='country' placeholder='e.g. UK' /> <Fab type="submit" color="primary" aria-label="add"><AddIcon /></Fab>
                </form><br /><br />

                {this.state.cardShow &&
                    <div>
                        <Card style={{ width: 325, position: 'absolute', left: '50%', top: '60%', transform: 'translate(-50%, -50%)' }}>
                            <CardHeader
                                title={this.state.city}
                                subheader={this.state.country}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="wthr img" width='200px' />
                            </Typography>
                                    <b>{this.state.description}</b>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    <p><b>Temperature: </b>{this.state.temp}</p>
                                    <p><b>MIN Temperature: </b>{this.state.temp_min}</p>
                                    <p><b>MAX Temperature: </b>{this.state.temp_max}</p>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                }
            </>
        )
    }
}

export default Weather;

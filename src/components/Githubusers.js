import React, { Component } from 'react'
import axios from 'axios';
import Helmet from 'react-helmet'
import { TextField, Paper, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core';

class githubusers extends Component {
    constructor(props) {
        super(props);
        this.state = { errorMessage: false, cardShow: false, }
    }

    // Form button function
    // getUser(e) {
    getUser = e => {
        e.preventDefault();
        const login = e.target.elements.login.value;
        axios
            .get(
                `https://api.github.com/users/${login}`
            )
            .then(response => {
                console.log(response.data);
                if (login) {
                    this.setState({
                        //users: response.data,
                        login: response.data.login, //showing login on webpage
                        name: response.data.name, //showing name on webpage,
                        avatar_url: response.data.avatar_url,
                        html_url: response.data.html_url,
                        public_repos: response.data.public_repos,
                        repos_url: response.data.repos_url,
                        location: response.data.location,
                        followers: response.data.followers,
                        errorMessage: false,
                        cardShow: true
                    });
                } else {
                    this.setState({
                        errorMessage: true,
                    });
                }
            })
            .catch(error => {
                console.log("Error is:", error);
                this.setState({
                    errorMessage:
                        "Username does not exist. Please enter valid username"
                });
            });
        e.target.reset(); //making input empty
    };

    //Disappear error message after 2000sec.
    componentDidUpdate() {
        setTimeout(() => this.setState({ errorMessage: "" }), 2000);
    }


    render() {

        return (
            <>
                <Helmet><title>Githubusers</title></Helmet>
                <h3>GitHub User CARD</h3>
                {/* <form onSubmit={this.getUser.bind(this)}> */}
                <form onSubmit={this.getUser}>
                    <TextField id="outlined-basic" variant="outlined" name="login" label="GitHub Username" placeholder="e.g. mojombo" />
                    {/* Displaying error messages */}
                    <Paper>
                        <Typography variant="h6">
                            {this.state.errorMessage}
                        </Typography>
                    </Paper>
                </form>
                {/* Displaying card contents */}
                {this.state.cardShow &&
                    <Card style={{ width: 325, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                        <CardActionArea>
                            <CardMedia style={{ height: 325 }}
                                image={this.state.avatar_url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.login}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <div><b>Name:</b> {this.state.name}</div>
                                    <div><b>Location:</b> {this.state.location}</div>
                                    <div><b>GitHhb url:</b><a href={`${this.state.html_url}`} target="_blank">
                                        {this.state.html_url}</a></div>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <b>Repositories: </b>{this.state.public_repos}
                            <b>Followers: </b> {this.state.followers}
                        </CardActions>
                    </Card>
                }
            </>

        );
    }

}

export default githubusers;
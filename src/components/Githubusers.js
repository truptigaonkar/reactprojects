import React, { Component } from 'react'
import axios from 'axios';
import Helmet from 'react-helmet'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

class githubusers extends Component {
    constructor(props) {
        super(props);
        this.state = { users: '', errorMessage: false }
    }
    // state = {
    //     users: "",
    // };

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
                        errorMessage: false,
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
    };

    //Disappear error message after 2000sec.
    componentDidUpdate() {
        setTimeout(() => this.setState({ errorMessage: "" }), 2000);
    }

    render() {
        return (
            <>
                <Helmet><title>Githubusers</title></Helmet>
                <h2>GitHub User Cards</h2>
                {/* <form onSubmit={this.getUser.bind(this)}> */}
                <form onSubmit={this.getUser}>
                    <TextField id="standard-basic" name="login" label="GitHub Username" />
                    {/* <TextField id="outlined-basic" variant="outlined" name="login" label="GitHub Username" /> */}
                    {/* Displaying error messages */}
                    <Paper>
                        <Typography variant="h6">
                            {this.state.errorMessage}
                        </Typography>
                    </Paper>
                    {/* Displaying card contents */}
                    <Card style={{ width: 325, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
                        <CardActionArea>
                            <CardMedia style={{height:325}}
                                image={this.state.avatar_url}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.login}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.name}
                                    {this.state.html_url}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>

                        </CardActions>
                    </Card>
                </form>
            </>
        );
        } 
    
}

export default githubusers;
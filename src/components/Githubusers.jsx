import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {
  TextField, Paper, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia,
} from '@material-ui/core';

class githubusers extends Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: false, cardShow: false };
  }

  // Disappear error message after 2000sec.
  componentDidUpdate() {
    setTimeout(() => this.setState({ errorMessage: '' }), 2000);
  }

    // Form button function
    // getUser(e) {
    getUser = (e) => {
      e.preventDefault();
      const login = e.target.elements.login.value;
      axios
        .get(
          `https://api.github.com/users/${login}`,
        )
        .then((response) => {
          if (login) {
            this.setState({
              // users: response.data,
              login: response.data.login, // showing login on webpage
              name: response.data.name, // showing name on webpage,
              avatarUrl: response.data.avatar_url,
              htmlUrl: response.data.html_url,
              publicRepos: response.data.public_repos,
              location: response.data.location,
              followers: response.data.followers,
              errorMessage: false,
              cardShow: true,
            });
          } else {
            this.setState({
              errorMessage: true,
            });
          }
        })
        .catch(() => {
          this.setState({
            errorMessage:
                        'Username does not exist. Please enter valid username',
          });
        });
      e.target.reset(); // making input empty
    };

    render() {
      const { errorMessage } = this.state;
      const { cardShow } = this.state;
      const { avatarUrl } = this.state;
      const { login } = this.state;
      const { name } = this.state;
      const { location } = this.state;
      const { htmlUrl } = this.state;
      const { publicRepos } = this.state;
      const { followers } = this.state;

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
                {errorMessage}
              </Typography>
            </Paper>
          </form>
          {/* Displaying card contents */}
          {cardShow
                    && (
                    <Card style={{
                      width: 325, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                    }}
                    >
                      <CardActionArea>
                        <CardMedia
                          style={{ height: 325 }}
                          image={avatarUrl}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {login}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            <div>
                              <b>Name:</b>
                              {name}
                            </div>
                            <div>
                              <b>Location:</b>
                              {' '}
                              {location}
                            </div>
                            <div>
                              <b>GitHhb url:</b>
                              <a href={`${htmlUrl}`} rel="noopener noreferrer">
                                {' '}
                                {/* use noopener noreferrer for target="_blank" */}
                                {htmlUrl}
                              </a>
                            </div>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <b>Repositories: </b>
                        {publicRepos}
                        <b>Followers: </b>
                        {' '}
                        {followers}
                      </CardActions>
                    </Card>
                    )}
        </>

      );
    }
}

export default githubusers;

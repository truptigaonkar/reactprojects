/* eslint-disable max-len */
import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import {
  TextField, Paper, Typography, AppBar, Button, Link
} from '@material-ui/core';
import { GITHUBUSERS_URL } from '../config.jsx';
import Userlist from './Userlist.jsx';

class Usersearch extends Component {
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
          `${GITHUBUSERS_URL}${login}`,
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
          <br />
          {/* <form onSubmit={this.getUser.bind(this)}> */}
          <form onSubmit={this.getUser}>
            <TextField id="outlined-basic" variant="outlined" name="login" label="GitHub Username" placeholder="e.g. mojombo" />
            <Button style={{ margin: '15px' }} type="submit" variant="contained" color="primary" disableElevation>
  GET USER
              </Button>
            {/* Displaying error messages */}
            <Paper>
              <Typography variant="h6">
                {errorMessage}
              </Typography>
            </Paper>
          </form>
          <br />
          <Userlist cardShow={cardShow} avatarUrl={avatarUrl} login={login} name={name} location={location} htmlUrl={htmlUrl} publicRepos={publicRepos} followers={followers} />
          <br />
          <br />
          <AppBar position="fixed" color="default" style={{ top: 'auto', bottom: 0 }}>
            <Button color="primary">
              <Link href="https://developer.github.com/v3/" color="inherit">
                <b>GitHub users API</b>
: https://developer.github.com/v3/
              </Link>
            </Button>
          </AppBar>
        </>
      );
    }
}

export default Usersearch;

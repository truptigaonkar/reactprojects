/* eslint-disable max-len */
import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import { GITHUBUSERS_URL } from '../config';
import Userlist from './Userlist';
import Footer from '../Footer';
import Style from './Usersearch.module.css';

class Usersearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: false,
      cardShow: false,
      alertShow: false,
    };
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
              alertShow: false,
            });
          } else {
            this.setState({
              errorMessage: true,

            });
          }
        })
        .catch(() => {
          this.setState({
            errorMessage: 'Username does not exist. Please enter valid username',
            alertShow: true,
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
      const { alertShow } = this.state;

      return (
        <>
          <Helmet><title>Githubusers</title></Helmet>
          <br />

          <form onSubmit={this.getUser}>
            <div className={Style.form}>
              <div className="inputfield">
                <input
                  type="text"
                  id="login"
                  className={Style.form__field}
                  placeholder="Github User...."
                />
                <label htmlFor="login" className={Style.form__label}>
            e.g. mojombo
                </label>
              </div>
              <button type="submit" className={Style.buttonGetuser}>GET USER</button>
            </div>
          </form>
          {alertShow && (
          <div className={`${Style.alert} ${Style.alertWarning}`}>{errorMessage}</div>)}
          <br />
          <Userlist cardShow={cardShow} avatarUrl={avatarUrl} login={login} name={name} location={location} htmlUrl={htmlUrl} publicRepos={publicRepos} followers={followers} />
          <br />
          <br />
          <Footer href="https://developer.github.com/v3/" title="GitHub users API" />
        </>
      );
    }
}

export default Usersearch;
